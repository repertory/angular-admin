#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const fstream = require('fstream');
const tar = require('tar');
const args = require('args');
const backup = require('mongodb-backup');
const moment = require('moment');
const {CONFIG} = require('./config');

moment.locale('zh-cn');
const now = moment().format('YYYYMMDDHHmmss');

let option = {
  web: false,
  mongo: false,
  all: true
};
args
  .command('web', '备份web文件', () => {
    option.web = true;
    option.all = false;
  })
  .command('mongo', '备份数据库', () => {
    option.mongo = true;
    option.all = false;
  })
  .command('all', '备份mongo和web，默认开启', () => option.all = true)
  .parse(process.argv, {version: false, name: '数据备份操作'});

function compress(input, output, type) {
  return new Promise((resolve, reject) => {
    fstream.Reader({'path': input, 'type': type || 'Directory'})
      .on('end', () => resolve())
      .on('error', err => reject(err))
      .pipe(tar
        .Pack({noRepository: true, fromBase: true})
        .on('error', err => reject(err))
      )
      .pipe(fstream.Writer(output));
  });
}

function initBackup() {
  let backupPath = path.join(path.dirname(__dirname), 'data', 'backup');
  if (fs.existsSync(backupPath)) {
    return Promise.resolve(option);
  }
  return new Promise((resolve, reject) => {
    fs.mkdir(backupPath, function (err) {
      if (err) {
        return reject(err)
      }
      resolve(option);
    });
  })
}

initBackup()
  .then(option => {
    console.log('正在执行备份操作，请勿关闭进程...');
    if (!option.all && !option.mongo) {
      return Promise.resolve(option);
    }
    console.log('正在备份数据库...');
    return new Promise((resolve, reject) => {
      let backupPath = path.join(path.dirname(__dirname), 'data', 'backup');
      backup({
        uri: CONFIG.app.databaseURI,
        root: path.join(backupPath, 'mongo'),
        logger: path.join(path.dirname(backupPath), 'logs', 'backup'),
        tar: now + '.tar',
        metadata: true,
        callback: function (err) {
          if (err) {
            reject(err);
          } else {
            fs.copyFile(
              path.join(backupPath, 'mongo', now + '.tar'),
              path.join(backupPath, 'mongo.latest.tar'),
              err => (err ? reject(err) : resolve(option))
            );
          }
        }
      });
    });
  })
  .then(option => {
    let backupPath = path.join(path.dirname(__dirname), 'data', 'backup');
    if (!option.all && !option.web) {
      return Promise.resolve();
    }
    if (!fs.existsSync(path.join(path.dirname(backupPath), 'public'))) {
      return Promise.reject('web文件未初始化，请先执行npm run build');
    }
    console.log('正在备份静态文件...');
    return compress(path.join(path.dirname(backupPath), 'public'), path.join(backupPath, 'web', now + '.tar'))
      .then(() => {
        return new Promise((resolve, reject) => {
          fs.copyFile(
            path.join(backupPath, 'web', now + '.tar'),
            path.join(backupPath, 'web.latest.tar'),
            err => (err ? reject(err) : resolve(option))
          );
        });
      });
  })
  .then(() => console.info('备份成功'))
  .catch(err => console.error('备份失败', err));

