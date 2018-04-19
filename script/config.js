const path = require('path');
const config = require('./config.json');
const package = require('../package');
require('dotenv').config({path: path.join(__dirname, '.env')});

const parse = config => {
  config = JSON.parse(JSON.stringify(config));
  (function (config, env, prefix) {
    for ([key, value] of Object.entries(config)) {
      let name = prefix ? [prefix, key].join('.') : key;
      if (!name.startsWith('env') && typeof env[name] === 'string') {
        value = process.env[env[name]] || value;  // 使用环境变量
        config[key] = value;
      }

      if (typeof value === 'object') {
        arguments.callee(config[key], env, name);
      } else {
        if (typeof value === 'string' && value.startsWith('~')) {
          config[key] = path.join(path.dirname(__dirname), value.substr(1));
        }
      }
    }
  })(config, config.env);

  config.app = Object.assign({
    serverURL: config.server.domain + config.server.path,
    publicServerURL: config.server.public + config.server.path,
  }, config.app);

  config.package = package;
  return config;
};

const CONFIG = parse(config);

module.exports.config = config;
module.exports.parse = parse;
module.exports.CONFIG = CONFIG;
