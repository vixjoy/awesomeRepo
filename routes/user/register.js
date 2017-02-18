
exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  rep(await helpers.register(req.payload));
};

exports.method = 'POST';
