const Parse = require('parse/node');

Parse.Cloud.beforeFind(Parse.User, function (request) {
  if (!request.master && !request.user) {
    let query = request.query;
    query.equalTo('objectId', null);
  }
});

// 生成用户默认字段
Parse.Cloud.beforeSave(Parse.User, function (request, response) {
  let user = request.object;

  // nick
  if (!user.has('nick')) {
    let authData = user.get('authData');
    authData = Object.values(authData || {}).pop() || {};
    user.set('nick', authData.nick || user.get('username'));
  }

  response.success();
});
