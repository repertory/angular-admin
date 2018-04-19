const Parse = require('parse/node');
// require('./oauth');

// 字段是否存在(方便没有权限时验证)
Parse.Cloud.define('exist', function (request, response) {
  let {table, key, value, ignore} = request.params;
  if (!table || !key || typeof value === 'undefined') {
    return response.error(false);
  }
  let query = new Parse.Query(table);
  query.equalTo(key, value);
  if (ignore) {
    query.notEqualTo('objectId', ignore);
  }
  query.count({useMasterKey: true})
    .then(count => count ? response.success(true) : response.error(new Parse.Error(101, 'OBJECT_NOT_FOUND')))
    .catch(() => response.error(new Parse.Error(101, 'OBJECT_NOT_FOUND')));
});
