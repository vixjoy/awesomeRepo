
const { lockState } = require('./{lockAction}/{id}');

exports.handler = async function(req, rep) {
  rep(lockState);
};

exports.method = ['GET'];
