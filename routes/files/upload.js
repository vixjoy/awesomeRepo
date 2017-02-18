
const fs = require('fs');

exports.handler = function(req, rep) {
  const data = req.payload;
  if (data.file) {
    //TODO: Make each user have a seperate folder.
    const name = data.file.hapi.filename;
    const path = __dirname + "/uploads/" + name;
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

exports.pres = ['authenticateUser'];
