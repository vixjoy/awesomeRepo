
const fs = require('fs');
const path = require('path');

exports.handler = function(req, rep) {
  console.log('asdf');
  const data = req.payload;
  const [fileName] = Object.keys(data);
  if (fileName && data[fileName]) {
    const savePath = path.resolve(__dirname + '/../../uploads/' + fileName);
    console.log(savePath);
    const file = fs.createWriteStream(path);

    file.on('error', function (err) {
      console.error(err);
    });

    data.file.pipe(file);

    data.file.on('end', function (err) {
      if(err) {
        console.error(err);
        rep(new Error(err));
      }
      //TODO: Make database record!!!
      const ret = {
        filename: data.file.hapi.filename,
        headers: data.file.hapi.headers
      };
      console.log({ret});
      rep({success: true});
    });
  }

};

exports.method = 'POST';

//exports.pres = ['authenticateUser'];
