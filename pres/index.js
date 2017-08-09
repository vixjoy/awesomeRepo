
const globby = require('globby');
const bluebird = require('bluebird');
const path = require('path');
const _ = require('lodash');
const boom = require('boom');

module.exports = async function(server) {
  server.app.pres = {};
  const pres = _.map(await globby(__dirname + '/**/*.js'), p => path.resolve(p));
  const filteredPres = _.filter(pres, fileName => fileName !== __filename);
  return await bluebird.all(_.map(filteredPres, async (preFile) => {
    const pre = require(preFile);
    const name = preFile.split(path.sep).slice(-1)[0].split('.')[0];
    server.app.pres[name] = (req, rep, ...rest) => {
      try {
        const preResult = pre.call(server, req, rep, ...rest);
        req.pre[name] = preResult;
      }
      catch(x) {
        console.error(x);
        rep(boom.wrap(x));
      }
    };
  }));
};
