
const boom = require('boom');

const lockState = {
  1: 'locked',
  2: 'locked',
  3: 'locked'
};

exports.handler = async function(req, rep) {
  try {
    const { lockAction, id } = req.params;
    if(lockAction.includes('un'))
      lockState[id] = 'unlocked';
    else
      lockState[id] = 'locked';
    rep(lockState);
  }
  catch(x) {
    console.error(x);
    rep(boom.wrap(x));
  }
};

exports.method = ['GET'];

exports.lockState = lockState;
