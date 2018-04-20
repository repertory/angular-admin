#!/usr/bin/env node
const Parse = require('parse/node');
const args = require('args');
const {CONFIG} = require('./config');
const setupData = require('./setup.json');

args
  .option('email', '管理员邮箱', setupData.root.email)
  .option('user', '管理员帐号', setupData.root.user)
  .option('pass', '管理员密码', setupData.root.pass)
  .option('nick', '管理员昵称', setupData.root.nick);

const ROLES = new Map();

function checkSetup(option) {
  Parse.initialize(CONFIG.app.appId, CONFIG.app.javascriptKey);
  Parse.serverURL = CONFIG.app.serverURL;
  Parse.masterKey = CONFIG.app.masterKey;

  return new Promise((resolve, reject) => {
    let role = new Parse.Query(Parse.Role);
    role.equalTo('name', 'root');
    role.count({useMasterKey: true})
      .then(count => (count ? reject('数据已初始化，请勿重复操作') : resolve(option)))
      .catch(() => resolve(option));
  });
}

Promise.resolve(args.parse(process.argv, {version: false, name: '数据初始化操作'}))
  .then(option => checkSetup(option))
  .then(option => {
    let user = new Parse.User();
    user.set('username', option.user);
    user.set('password', option.pass);
    user.set('email', option.email);
    user.set('nick', option.nick);

    return user.signUp(null);
  })
  .then(user => {
    let roleACL = new Parse.ACL();
    roleACL.setReadAccess(user, true);
    roleACL.setWriteAccess(user, true);
    roleACL.setPublicReadAccess(true);

    let role = new Parse.Role('root', roleACL);
    role.set('alias', '超级管理员');
    role.getUsers().add(user);
    return role.save(null, {useMasterKey: true});
  })
  .then(root => {
    ROLES.set('root', root);

    let roleACL = new Parse.ACL();
    roleACL.setRoleReadAccess(root, true);
    roleACL.setRoleWriteAccess(root, true);
    roleACL.setPublicReadAccess(true);

    let role = new Parse.Role('admin', roleACL);
    role.set('alias', '管理员');
    role.getRoles().add(root);
    return role.save(null, {useMasterKey: true});
  })
  .then(admin => {
    ROLES.set('admin', admin);

    if (!setupData.role || !setupData.role.length) {
      return Promise.resolve();
    }

    return Parse.Object.saveAll(setupData.role.map(x => {
      let roleACL = new Parse.ACL();
      roleACL.setRoleReadAccess('root', true);
      roleACL.setRoleWriteAccess('root', true);
      roleACL.setRoleReadAccess('admin', true);
      roleACL.setRoleWriteAccess('admin', true);
      roleACL.setPublicReadAccess(true);

      let role = new Parse.Role(x.name, roleACL);
      role.set('alias', x.alias);
      role.getRoles().add(admin);
      return role;
    }), {useMasterKey: true});
  })
  .then(rows => {
    rows.forEach(row => ROLES.set(row.get('name'), row));
    return Promise.resolve(ROLES);
  })
  .then(() => {

    function getACL(roles) {
      let acl = new Parse.ACL();
      acl.setRoleReadAccess('root', true);
      acl.setRoleWriteAccess('root', true);
      roles.forEach(role => {
        if (role == 'public') {
          acl.setPublicReadAccess(true);
        } else {
          acl.setRoleReadAccess(role, true);
        }
      });
      return acl;
    }

    let menus = setupData.menu.map(menu => {
      menu.acl = menu.acl || ['root'];
      let Menu = Parse.Object.extend('Menu');
      let object = new Menu();
      let roles = object.relation('roles');
      menu.acl.forEach(x => {
        if (ROLES.has(x)) {
          roles.add(ROLES.get(x));
        }
      });
      object.setACL(getACL(menu.acl));
      object.set('group', menu.group);
      object.set('name', menu.name);

      if (menu.orderBy) object.set('orderBy', menu.orderBy);
      if (menu.url) object.set('url', menu.url);
      if (menu.icon) object.set('icon', menu.icon);
      return object;
    });
    return Parse.Object.saveAll(menus, {useMasterKey: true});
  })
  .then(() => {
    let Notification = Parse.Object.extend('Notification');
    let object = new Notification();
    object.set('sender', null);
    object.set('content', setupData.notification.public);
    object.set('public', true);
    object.set('role', null);
    object.set('user', null);

    return object.save(null, {useMasterKey: true});
  })
  .then(() => {
    let query = new Parse.Query(Parse.User);
    query.equalTo('username', setupData.root.user);
    return query.first({useMasterKey: true});
  })
  .then(user => {
    let Notification = Parse.Object.extend('Notification');
    let object = new Notification();
    object.set('sender', user);
    object.set('content', setupData.notification.user);
    object.set('public', false);
    object.set('role', null);
    object.set('user', user);

    let readBy = object.relation('readBy');
    readBy.add(user);

    let deletedBy = object.relation('deletedBy');
    deletedBy.add(user);

    return object.save(null, {useMasterKey: true});
  })
  .then(() => Parse.Object.saveAll(
    setupData.users.map(row => {
      let user = new Parse.User();
      user.set('username', row.user);
      user.set('password', row.pass);
      user.set('email', row.email);
      user.set('nick', row.nick);
      return user;
    }), {useMasterKey: true}
  ))
  .then(users => {
    let roles = new Map();
    users.forEach((user, i) => {
      setupData.users[i].roles.forEach(x => {
        if (ROLES.has(x)) {
          roles.set(x, roles.has(x) ? [...roles.get(x), user] : [user]);
        }
      });
    });
    let rows = [];
    for (let [key, value] of roles) {
      rows.push(ROLES.get(key).getUsers().add(value));
    }
    return Parse.Object.saveAll(rows, {useMasterKey: true});
  })
  .then(() => console.log('操作成功'))
  .catch(err => console.error('操作失败:', err));
