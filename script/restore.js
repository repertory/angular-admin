#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const tar = require('tar');
const args = require('args');
const restore = require('mongodb-restore');
const {CONFIG} = require('./config');

let option = {
  web: false,
  mongo: false,
  all: false
};
args
  .command('web', '还原web文件', () => option.web = true)
  .command('mongo', '还原数据库', () => option.mongo = true)
  .command('all', '还原数据库和web文件', () => option.all = true)
  .parse(process.argv, {version: false, name: '数据还原操作'});

Promise.resolve(option)
  .then(option => {
    console.log('正在执行还原操作，请勿关闭进程...');
    let backupPath = path.join(path.dirname(__dirname), 'data', 'backup');
    if (!option.all && !option.mongo) {
      return Promise.resolve(option);
    }
    if (!fs.existsSync(path.join(backupPath, 'mongo.latest.tar'))) {
      return Promise.reject('未找到数据库备份文件');
    }
    console.log('正在还原数据库...');
    return new Promise((resolve, reject) => {
      restore({
        uri: CONFIG.app.databaseURI,
        root: backupPath,
        logger: path.join(path.dirname(backupPath), 'logs', 'store'),
        tar: 'mongo.latest.tar',
        metadata: true,
        drop: true,
        callback: err => (err ? reject(err) : resolve(option)),
      });
    });
  })
  .then(option => {
    let backupPath = path.join(path.dirname(__dirname), 'data', 'backup');
    if (!option.all && !option.web) {
      return Promise.resolve();
    }
    if (!fs.existsSync(path.join(backupPath, 'web.latest.tar'))) {
      return Promise.reject('未找到web备份文件');
    }
    console.log('正在还原web文件...');
    return new Promise((resolve, reject) => {
      fs.createReadStream(path.join(backupPath, 'web.latest.tar'))
        .on('error', err => reject(err))
        .pipe(tar
          .Extract({
            path: path.join(path.dirname(backupPath), 'public'),
            strip: 0
          })
          .on('error', err => reject(err))
          .on('end', () => resolve())
        );
    });
  })
  .then(() => console.info('还原成功'))
  .catch(err => console.error('还原失败', err));

