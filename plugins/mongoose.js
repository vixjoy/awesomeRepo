
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
};
