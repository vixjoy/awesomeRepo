
const fs = require('fs');
const path = require('path');
const _ = require('lodash');


//Edit me to add configs! I should be run as part of CI.
const configTemplate = {
  mongoUrl: process.env.MONGO_URL || 'localhost:27017',
  port: process.env.APP_PORT || 8080,
  secret: process.env.APP_SECRET || 'lol'
};

const currentConfig = require('./config') || {};

if(currentConfig)
  _.forEach(Object.keys(configTemplate), key => currentConfig[key] = currentConfig[key] || configTemplate[key]);

fs.writeFileSync(path.resolve('./config.json'), JSON.stringify(currentConfig, null, 2), { encoding: 'UTF8' });
