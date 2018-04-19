const Parse = require('parse/node');

// 确保超级管理员拥有所有权限
Parse.Cloud.beforeSave(Parse.Role, function (request, response) {
  let role = request.object;

  if (!role.has('alias')) {
    role.set('alias', role.get('name'));
  }

  if (role.get('name') !== 'root') {
    let query = new Parse.Query(Parse.Role);
    query.equalTo('name', 'root');
    query.first({useMasterKey: true})
      .then(root => role.getRoles().add(root))
      .done(() => response.success());
  } else {
    response.success();
  }
});
