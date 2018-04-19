var config = require('./config.simple.json');

Object.assign(config.app, {
  serverURL: config.server.domain + config.server.path,
  publicServerURL: config.server.public + config.server.path,
});

module.exports.CONFIG = config;
