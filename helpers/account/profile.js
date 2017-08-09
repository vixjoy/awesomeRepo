
exports.loadProfile = async function(username) {
  const { users } = this.db;
  const user = await (users.findOne({ username }).exec());

  delete user.facebookProfile;
  delete user.type;
  delete user.username;

  return user;
};

exports.saveProfile = async function(profile) {
  //TODO
};
