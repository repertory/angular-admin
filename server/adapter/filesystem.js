const fs = require('fs');
const path = require('path');
const pathSep = require('path').sep;

function FileSystem(options) {
  options = options || {};
  this.rootDir = options.filesRootDirectory || 'files';
  this.filesDir = options.filesSubDirectory || '';
  this.mkdir(this.getApplicationDir());
  if (!this.applicationDirExist()) {
    throw "文件目录不存在";
  }
}

FileSystem.prototype.createFile = function (filename, data) {
  return new Promise((resolve, reject) => {
    let filepath = this.getLocalFilePath(filename);
    fs.writeFile(filepath, data, (err) => {
      if (err !== null) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

FileSystem.prototype.deleteFile = function (filename) {
  return new Promise((resolve, reject) => {
    let filepath = this.getLocalFilePath(filename);
    fs.readFile(filepath, function (err, data) {
      if (err !== null) {
        return reject(err);
      }
      fs.unlink(filepath, (unlinkErr) => {
        if (err !== null) {
          return reject(unlinkErr);
        }
        resolve(data);
      });
    });

  });
};

FileSystem.prototype.getFileData = function (filename) {
  return new Promise((resolve, reject) => {
    let filepath = this.getLocalFilePath(filename);
    fs.readFile(filepath, function (err, data) {
      if (err !== null) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

FileSystem.prototype.getFileLocation = function (config, filename) {
  return config.mount + '/files/' + config.applicationId + '/' + filename;
};


FileSystem.prototype.getApplicationDir = function () {
  if (this.filesDir) {
    return path.join(this.rootDir, this.filesDir);
  } else {
    return this.rootDir;
  }
};

FileSystem.prototype.applicationDirExist = function () {
  return fs.existsSync(this.getApplicationDir());
};

FileSystem.prototype.getLocalFilePath = function (filename) {
  let applicationDir = this.getApplicationDir();
  if (!fs.existsSync(applicationDir)) {
    this.mkdir(applicationDir);
  }
  return path.join(applicationDir, filename);
};

FileSystem.prototype.mkdir = function (dirPath) {
  let dirs = dirPath.split(pathSep);
  var root = "";

  while (dirs.length > 0) {
    var dir = dirs.shift();
    if (dir === "") root = pathSep;
    if (!fs.existsSync(path.join(root, dir))) {
      try {
        fs.mkdirSync(path.join(root, dir));
      } catch (e) {
        if (e.code == 'EACCES') {
          throw new Error("上传文件没有写入权限");
        }
      }
    }
    root = path.join(root, dir, pathSep);
  }
};

module.exports = FileSystem;
module.exports.default = FileSystem;
