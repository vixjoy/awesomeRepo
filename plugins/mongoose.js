
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const glob = require('globby');
const path = require('path');
const _ = require('lodash');

module.exports = async function(server, config) {
  const connectedMongoose = mongoose.connect(config.mongoUrl);
  server.db = {};
  const modelPaths = await glob(path.resolve('./models/**/*.js'));
  _.forEach(modelPaths, (modelPath) => {
    modelPath = path.resolve(modelPath);
    const { schema, index } = require(modelPath);
    const newSchema = new connectedMongoose.Schema(schema);
    if(index) {
      if(_.isArray(index))
        newSchema.index(...index);
      else
        newSchema.index(index);
    }

    const name = modelPath.split(path.sep).slice(-1)[0].split('.')[0];
    server.db[name] = connectedMongoose.model(name, newSchema);
  });

/*  const fileSchema = new connectedMongoose.Schema({
    path: String,
    username: String
  });
  fileSchema.index({
    path: 1,
    username: 2
  }, {
    unique: true
  });
  server.db.files = connectedMongoose.model('files', fileSchema);

  const userSchema = new connectedMongoose.Schema({
    username: { type: String, index: true },
    password: String
  });

  server.db.users = connectedMongoose.model('user', userSchema);*/
};
