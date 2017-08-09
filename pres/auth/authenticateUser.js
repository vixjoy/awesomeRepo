
module.exports = function(req) {
  const { token, username } = req.headers;
  const { helpers } = req.server.app;
  try {
    const { username: decodedUsername } = helpers.decryptToken(token);

    if(decodedUsername !== username)
      throw 'Invalid Token';

    return {
      token,
      username
    };
  }
  catch(x) {
    if(x.message === 'jwt expired')
      throw 'Token Expired!';

    throw x;
  }
};
