
const jwt = require('jsonwebtoken');

const { secret } = require('../../config');

exports.createToken = async function(username) {
  return jwt.sign({ username }, secret, { expiresIn: '8h' });
};

exports.decryptToken = function(token) {
  const tokenData = jwt.verify(token, secret);
  return tokenData;
};
