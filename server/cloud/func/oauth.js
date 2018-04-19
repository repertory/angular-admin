const Parse = require('parse/node');
const qs = require('querystring');
const config = require('../../../config').CONFIG;

// 获取oauth跳转地址
Parse.Cloud.define('authorize', function (request, response) {
  const {state} = request.params;

  const authorize = function (url, param) {
    return url + '?' + qs.stringify(param);
  };

  switch (state) {
    case 'dingtalk':
      response.success(authorize('https://oapi.dingtalk.com/connect/qrconnect', {
        state: state,
        appid: config.app.auth.dingtalk.id,
        redirect_uri: config.app.auth.dingtalk.callback,
        scope: 'snsapi_login',
        response_type: 'code'
      }));
      break;

    case 'github':
      response.success(authorize('https://github.com/login/oauth/authorize', {
        state: state,
        client_id: config.app.auth.github.id,
        redirect_uri: config.app.auth.github.callback,
        scope: 'user',
      }));
      break;

    case 'weibo':
      response.success(authorize('https://api.weibo.com/oauth2/authorize', {
        state: state,
        client_id: config.app.auth.weibo.id,
        redirect_uri: config.app.auth.weibo.callback,
        scope: 'email',
      }));
      break;

    default:
      response.error('暂不支持登录类型:' + state);
  }
});

// 获取oauth token
Parse.Cloud.define('accessToken', function (request, response) {
  const {code, state} = request.params;

  let authData = {};

  switch (state) {
    case 'dingtalk':
      Parse.Cloud.httpRequest({
        method: 'GET',
        url: `https://oapi.dingtalk.com/sns/gettoken?appid=${config.app.auth.dingtalk.id}&appsecret=${config.app.auth.dingtalk.secret}`
      })
        .then(res => {
          authData = res.data;
          if (!authData.access_token) {
            return Promise.reject('access_token获取失败');
          }
          return Parse.Cloud.httpRequest({
            method: 'POST',
            url: 'https://oapi.dingtalk.com/sns/get_persistent_code?access_token=' + authData.access_token,
            body: JSON.stringify({tmp_auth_code: code})
          })
        })
        .then(res => {
          Object.assign(authData, res.data, {id: res.data.unionid});
          return Parse.Cloud.httpRequest({
            method: 'POST',
            url: 'https://oapi.dingtalk.com/sns/get_sns_token?access_token=' + authData.access_token,
            body: JSON.stringify({
              openid: authData.openid,
              persistent_code: authData.persistent_code
            })
          })
        })
        .then(res => {
          Object.assign(authData, res.data);
          return Parse.Cloud.httpRequest({
            method: 'GET',
            url: 'https://oapi.dingtalk.com/sns/getuserinfo?sns_token=' + authData.sns_token
          })
        })
        .then(res => response.success(Object.assign(authData, res.data, {nick: res.data.user_info.nick})), response.error);
      break;

    case 'github':
      Parse.Cloud.httpRequest({
        method: 'POST',
        url: 'https://github.com/login/oauth/access_token',
        body: {
          client_id: config.app.auth.github.id,
          client_secret: config.app.auth.github.secret,
          code: code
        }
      })
        .then(res => {
          authData = qs.parse(res.text);
          if (!authData.access_token) {
            return Promise.reject('access_token获取失败');
          }
          return Parse.Cloud.httpRequest({
            method: 'GET',
            url: 'https://api.github.com/user?access_token=' + authData.access_token,
            headers: {
              'Authorization': 'bearer ' + authData.access_token,
              'User-Agent': 'parse-server'
            }
          })
        })
        .then(res => response.success(Object.assign(authData, res.data, {nick: res.data.name})), response.error);
      break;

    case 'weibo':
      Parse.Cloud.httpRequest({
        method: 'POST',
        url: 'https://api.weibo.com/oauth2/access_token',
        body: {
          client_id: config.app.auth.weibo.id,
          client_secret: config.app.auth.weibo.secret,
          redirect_uri: config.app.auth.weibo.callback,
          grant_type: 'authorization_code',
          code: code
        }
      })
        .then(res => {
          Object.assign(authData, res.data, {id: res.data.uid});
          if (!authData.access_token) {
            return Promise.reject('access_token获取失败');
          }
          return Parse.Cloud.httpRequest({
            method: 'GET',
            url: 'https://api.weibo.com/2/users/show.json?access_token=' + authData.access_token + '&uid=' + authData.uid,
          })
        })
        .then(res => response.success(Object.assign(authData, {
          user: res.data,
          nick: res.data.name
        })), response.error);
      break;

    default:
      response.error('暂不支持登录类型:' + state);
  }

});
