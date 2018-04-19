const Parse = require('parse/node');

Parse.Cloud.beforeFind('Notification', function (request) {
  let query = request.query;
  if (request.user) {
    query.notEqualTo('deletedBy', request.user);
    query.greaterThanOrEqualTo('createdAt', request.user.get('createdAt'));
  }
});

// 消息权限
Parse.Cloud.beforeSave('Notification', function (request, response) {

  if (request.object.isNew()) {

    let acl = new Parse.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);

    Promise.resolve(acl)
      .then(acl => {
        if (request.object.has('public')) {
          let public = !!request.object.get('public');
          if (public) {
            acl.setPublicReadAccess(true);
            acl.setPublicWriteAccess(true);
            request.object.set('type', 'public');
          }
        }
        return Promise.resolve(acl);
      })
      .then(acl => new Promise((resolve, reject) => {

        if (request.object.has('role')) {
          let role = request.object.get('role');
          if (role) {
            if (!request.object.has('type')) {
              request.object.set('type', 'role');
              acl.setRoleReadAccess('root', true);
              acl.setRoleWriteAccess('root', true);
            }
            role.fetch({useMasterKey: true})
              .then(() => {
                acl.setRoleReadAccess(role, true);
                acl.setRoleWriteAccess(role, true);
                resolve(acl);
              })
              .catch(reject);
          }
        } else {
          resolve(acl);
        }
      }))
      .then(acl => {
        if (request.object.has('user')) {
          let user = request.object.get('user');
          if (user) {
            acl.setReadAccess(user, true);
            acl.setWriteAccess(user, true);
            if (!request.object.has('type')) {
              request.object.set('type', 'user');
            }
          }
        }
        return Promise.resolve(acl);
      })
      .then(acl => {
        request.object.setACL(acl);
        response.success();
      })
      .catch(response.error);
  } else {
    response.success();
  }

});
