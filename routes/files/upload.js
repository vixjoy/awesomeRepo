
const fs = require('fs');
const path = require('path');
const boom = require('boom');

exports.handler = async function(req, rep) {
  const { token } = req.state;
  const { helpers } = req.server.app;
  const data = req.payload;

  const [fileName] = Object.keys(data);

  const { username } = helpers.decryptToken(token);
  if (fileName && data[fileName]) {
    await new Promise((res) => fs.mkdir('../../uploads/', res));
    const savePath = path.resolve(__dirname + '/../../uploads/' + fileName + '.archive');
    const file = fs.createWriteStream(savePath);

    file.on('error', function (err) {
      console.error(err);
      rep(new Error(err));
    });

    file.write(data[fileName], async () => {
      try {
        await helpers.saveFile(savePath, username);
      }
      catch(x) {
        rep(boom.wrap(x));
      }
      rep({ success: true });
    });
  }

};

exports.method = 'POST';

exports.pres = ['authenticateUser'];
