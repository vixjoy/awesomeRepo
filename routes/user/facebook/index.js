
const boom = require('boom');

exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  try {
    const token = await helpers.facebookLogin(req.payload);
    rep({ token });
  }
  catch(x) {
    console.error(x);
    rep(boom.wrap(x));
  }
};

exports.method = 'POST';
