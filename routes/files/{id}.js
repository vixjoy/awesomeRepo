
exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const { id } = req.params;
  const { token } = req.state;
  const { username } = helpers.decryptToken(token);
  const filePath = await helpers.getFile(username, id);
  rep.file(filePath);
};

exports.method = 'GET';

//exports.pres = ['authenticateUser'];
