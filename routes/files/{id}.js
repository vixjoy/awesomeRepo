
exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const { id } = req.params;
  const { username } = req.state;
  rep(await helpers.getFile(username, id));
};

exports.method = 'GET';

exports.pres = ['authenticateUser'];
