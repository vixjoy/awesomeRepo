
exports.login = async function({ username, password, type }) {
  const { users } = this.db;
  const { helpers } = this.app;
  const user = await (users.findOne({ username, type }).exec());
  if(!user) {
    throw 'Username is incorrect or does not exist!';
  }
  if(password === user.password) {
    return {
      token: await helpers.createToken(user.username)
    };
  }
  throw 'Incorrect password provided';
};

exports.register = async function(user) {
  //TODO: Encrypt user's password
  const { users } = this.db;
  const { helpers } = this.app;
  user.type = 'local';
  user.displayName = `${user.displayName}#${helpers.generateDisplayNameHash()}`;
  try {
    await users.create(user);
    return {
      token: await helpers.createToken(user.username)
    };
  }
  catch(x) {
    if(x.errmsg.includes(user.displayName))
      return await helpers.register(user);
    throw x;
  }
};
