
exports.facebookLogin = async function(profile) {
  const { users } = this.db;
  const { helpers } = this.app;

  if(!profile.id)
    throw 'No id provided for Facebook profile!';

  const user = await (users.findOne({ username: profile.id }).exec());

  if(!user) {
    try {
      await users.create({
        username: profile.id,
        type: 'facebook',
        info: profile
      });
      return await helpers.createToken(profile.id);
    }
    catch(x) {
      console.error(x);
      throw 'There was an issue creating your profile. Please try again';
    }
  }

  try {
    return await helpers.createToken(profile.id);
  }
  catch(x) {
    console.error(x);
    throw 'There was an issue logging in. Please try again';
  }
};
