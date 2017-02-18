const path = require('path');

exports.override = function(server) {
  server.route({
    method: 'GET',
    path: '/{file*}',
    handler: (req, rep) => {
      const file = req.params.file || 'index.html';
      const filePath = path.resolve(`${__dirname}/../static/${file}`);
      return rep.file(filePath);
    }
  });
};