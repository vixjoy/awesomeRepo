
exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const { token } = req.state;
  const { username } = helpers.decryptToken(token);
  rep(await helpers.getFiles(username));
};

exports.method = 'GET';

exports.pres = ['authenticateUser'];
