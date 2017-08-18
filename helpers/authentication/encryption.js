
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const { secret, salt: baseSalt } = require('../../config');
const salt = new Buffer(baseSalt);

exports.createToken = async function(username) {
  return jwt.sign({ username }, secret, { expiresIn: '8h' });
};

exports.decryptToken = function(token) {
  try {
    const tokenData = jwt.verify(token, secret);
    return tokenData;
  }
  catch(x) {
    console.error(x.toString());
    return false;
  }
};

exports.hashPassword = async function(password) {
  try {
    return await argon2.hash(password, salt);
  }
  catch(x) {
    console.error(x);
    throw x;
  }
};

exports.verifyPassword = async function(password, saltedPassword) {
  try {
    return await argon2.verify(saltedPassword, password);
  }
  catch(x) {
    console.error(x);
    throw x;
  }
};
