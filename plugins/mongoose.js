
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = async function(server, config) {
  const connectedMongoose = mongoose.connect(config.mongoUrl);
  server.db = {};

  const fileSchema = new connectedMongoose.Schema({
    path: { type: String, index: true },
    username: String
  });
  server.db.files = connectedMongoose.model('files', fileSchema);

  const userSchema = new connectedMongoose.Schema({
    username: { type: String, index: true },
    password: String
  });

  server.db.users = connectedMongoose.model('user', userSchema);
};
