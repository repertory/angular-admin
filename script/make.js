#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const args = require('args');

let {config, parse} = require('./config');

function writeFile(fileName, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, content, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}

args
  .option('key', '是否生成新的KEY', false)
  .option('account', '是否生成新的管理员', false)
  .option('user', '管理管账号', 'admin')
  .option('pass', '管理管密码', 'admin');

Promise.resolve(args.parse(process.argv, {version: false, name: '配置项生成操作'}))
  .then(option => {
    if (option.key) {
      console.info('正在重置应用key...');
      const size = 32;
      Object.assign(config.app, {
        appId: crypto.randomBytes(size / 2).toString('hex'),
        masterKey: crypto.randomBytes(size / 2).toString('hex'),
        readOnlyMasterKey: crypto.randomBytes(size / 2).toString('hex'),
        fileKey: crypto.randomBytes(size / 2).toString('hex'),
        clientKey: crypto.randomBytes(size / 2).toString('hex'),
        javascriptKey: crypto.randomBytes(size / 2).toString('hex'),
        restAPIKey: crypto.randomBytes(size / 2).toString('hex'),
        dotNetKey: crypto.randomBytes(size / 2).toString('hex'),
        webhookKey: crypto.randomBytes(size / 2).toString('hex'),
      });
    }
    return Promise.resolve(option);
  })
  .then(option => {
    if (option.account) {
      console.info('正在重置管理员账号...');
      config.dashboard.users = [{user: option.user, pass: option.pass}];
    }
    return Promise.resolve(option);
  })
  .then(option => {
    config.dashboard.useEncryptedPasswords = true;
    config.dashboard.users = config.dashboard.users.map(user => {
      if (user.pass.length < 50) {
        console.info(`正在加密管理员[${user.user}]的密码...`);
        user.pass = bcrypt.hashSync(user.pass);
      }
      return user;
    });
    return writeFile(path.join(__dirname, 'config.json'), JSON.stringify(config, null, 2));
  })
  .then(() => {
    const finalConfig = parse(config);
    const configSimple = {
      server: {
        domain: finalConfig.server.domain,
        path: finalConfig.server.path,
      },
      app: {
        appName: finalConfig.app.appName,
        appId: finalConfig.app.appId,
        javascriptKey: finalConfig.app.javascriptKey,
      },
      package: {
        version: finalConfig.package.version,
        author: finalConfig.package.author,
      }
    };
    console.log(JSON.stringify(configSimple, null, 2));
    return writeFile(path.join(__dirname, 'config.simple.json'), JSON.stringify(configSimple, null, 2));
  })
  .then(() => console.info('配置项保存成功'))
  .catch(err => console.error('配置项保存失败', err));
