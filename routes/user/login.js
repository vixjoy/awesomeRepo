
exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  rep(await helpers.login(req.query));
};

exports.method = 'GET';
