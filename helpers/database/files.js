
const fs = require('fs');

exports.getFiles = async function(username) {
  const { files } = this.db;
  return await (files.get({ username }, '_id path').exec());
};

exports.getFile = async function(username, id) {
  const { files } = this.db;
  const { path } = await (files.getOne({ id, username }, 'path').exec());
  return fs.readFileSync(path, { encoding: 'UTF8' });
};

exports.deleteFile = async function(_id) {
  const { files } = this.db;
  return await (files.find({ _id }).delete.exec());
};
