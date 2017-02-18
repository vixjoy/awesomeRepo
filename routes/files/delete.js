
exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const { id } = req.state;
  rep(await helpers.deleteFile(id));
};

exports.method = 'GET';

//exports.pres = ['authenticateUser'];
