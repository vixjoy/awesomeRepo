
const _ = require('lodash');
const boom = require('boom');

exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const { username, password } = _.isEmpty(req.query) ? req.payload : req.query;
  try {
    const token = await helpers.login({ username, password, type: 'local' });
    rep(token);
  }
  catch(x) {
    console.error(x);
    rep(boom.wrap(x));
  }
};

exports.method = ['GET', 'POST'];
