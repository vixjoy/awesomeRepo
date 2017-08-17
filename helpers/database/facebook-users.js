
exports.facebookLogin = async function(profile) {
  const { users } = this.db;
  const { helpers } = this.app;

  if(!profile)
    throw 'No profile provided, one is required';

  if(!profile.id)
    throw 'No id provided for Facebook profile!';

  const user = await (users.findOne({ username: profile.id }).exec());

  if(!user) {
    if(Object.keys(profile).length === 1)
      throw `You can't create an account with stored credentials!`;

    try {
      const user = {
        username: profile.id,
        type: 'facebook',
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        email: profile.email || '',
        gender: profile.gender || '',
        displayName: `${profile.displayName}#${helpers.generateDisplayNameHash()}`,
        facebookProfile: profile
      };
      await users.create(user);
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
