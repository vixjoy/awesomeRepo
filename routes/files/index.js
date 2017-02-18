
exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const { username } = req.state;
  rep(await helpers.getFiles(username));
};

exports.method = 'GET';

exports.pres = ['authenticateUser'];
