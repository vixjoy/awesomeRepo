
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
    await new Promise((res) => fs.mkdir(path.resolve('../../uploads'), res));
    const savePath = path.resolve(__dirname + '/../../uploads/' + fileName + '.archive');
    const file = fs.createWriteStream(savePath);

    file.on('error', (err) => {
      console.error(err);
      rep(boom.wrap(err));
    });

    file.write(data[fileName], async () => {
      try {
        const { _id, path } = await helpers.saveFile(savePath, username);
        rep({ _id, path: path.split('uploads')[1] });
      }
      catch(x) {
        console.error(x.toString());
        rep(await helpers.getFileFromPath(savePath, username));
      }
    });
  }

};

exports.method = 'POST';

exports.config = {
  payload: {
    maxBytes: Number.MAX_SAFE_INTEGER
  }
};

exports.pres = ['authenticateUser'];
