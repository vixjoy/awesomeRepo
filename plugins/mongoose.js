
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = async function(server, config) {
  const connectedMongoose = mongoose.connect(config.mongoUrl);
  server.db = {};

  const fileSchema = new connectedMongoose.Schema({
    path: String,
    username: String
  });
  server.db.files = connectedMongoose.model('files', fileSchema);

  const userSchema = new connectedMongoose.Schema({
    username: String,
    password: String
  });

  server.db.users = connectedMongoose.model('user', userSchema);
};
