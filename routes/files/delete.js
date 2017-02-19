
exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const { id } = req.payload;
  const { token } = req.state;
  const { username } = helpers.decryptToken(token);
  rep(await helpers.deleteFile(username, id));
};

exports.method = 'POST';

exports.pres = ['authenticateUser'];
