#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const tar = require('tar');
const args = require('args');
const restore = require('mongodb-restore');
const {CONFIG} = require('./config');

args.option('type', '还原类型[支持: all/mongo/web]', 'all').option('point', '时间点');

Promise.resolve(args.parse(process.argv, {version: false, name: '数据还原操作'}))
  .then(option => {
    console.log(`正在执行还原操作(${option.point || 'latest'})，请勿关闭进程...`);
    if (!['all', 'mongo'].includes(option.type.toLowerCase())) {
      return Promise.resolve(option);
    }
    let backupFile = !option.point ? 'mongo.latest.tar' : `${option.point}.tar`;
    let backupPath = !option.point ? path.join(path.dirname(__dirname), 'data', 'backup') : path.join(path.dirname(__dirname), 'data', 'backup', 'mongo');
    if (!fs.existsSync(path.join(backupPath, backupFile))) {
      return Promise.reject('未找到数据库备份文件');
    }
    console.log('正在还原数据库...');
    return new Promise((resolve, reject) => {
      restore({
        uri: CONFIG.app.databaseURI,
        root: backupPath,
        logger: path.join(path.dirname(__dirname), 'data', 'logs', 'restore'),
        tar: backupFile,
        metadata: true,
        drop: true,
        callback: err => (err ? reject(err) : resolve(option)),
      });
    });
  })
  .then(option => {
    if (!['all', 'web'].includes(option.type.toLowerCase())) {
      return Promise.resolve(option);
    }
    let backupFile = !option.point ? 'web.latest.tar' : `${option.point}.tar`;
    let backupPath = !option.point ? path.join(path.dirname(__dirname), 'data', 'backup') : path.join(path.dirname(__dirname), 'data', 'backup', 'web');
    if (!fs.existsSync(path.join(backupPath, backupFile))) {
      return Promise.reject('未找到web备份文件');
    }
    console.log('正在还原web文件...');
    return new Promise((resolve, reject) => {
      fs.createReadStream(path.join(backupPath, backupFile))
        .on('error', err => reject(err))
        .pipe(tar
          .Extract({
            path: path.join(path.dirname(__dirname), 'data', 'public'),
            strip: 0
          })
          .on('error', err => reject(err))
          .on('end', () => resolve(option))
        );
    });
  })
  .then(() => console.info('还原成功'))
  .catch(err => console.error('还原失败', err));

