
const boom = require('boom');

exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const { authenticateUser: { username } } = req.pre;
  try {
    const profile = await helpers.loadProfile(username);
    rep(profile);
  }
  catch(x) {
    console.error(x);
    rep(boom.wrap(x));
  }
};

exports.method = 'GET';

exports.pres = ['authenticateUser'];
