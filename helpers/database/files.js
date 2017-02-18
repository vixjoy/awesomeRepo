
exports.getFiles = async function(username) {
  const { files } = this.db;
  return await (files.get({ username }, '_id path').exec());
};

exports.deleteFile = async function(_id) {
  const { files } = this.db;
  return await (files.find({ _id }).delete.exec());
};
