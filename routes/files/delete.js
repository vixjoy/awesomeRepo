
exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const { id } = req.params;
  const { token } = req.state;
  const { username } = helpers.decryptToken(token);
  rep(await helpers.deleteFile(username, id));
};

exports.method = 'GET';

exports.pres = ['authenticateUser'];
