import {Injectable} from '@angular/core';
import {Parse} from 'parse';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {ConfigService} from '../config/config.module';

@Injectable()
export class ParseService {

  ACL = Parse.ACL;
  Analytics = Parse.Analytics;
  Cloud = Parse.Cloud;
  Config = Parse.Config;
  Error = Parse.Error;
  File = Parse.File;
  GeoPoint = Parse.GeoPoint;
  LiveQuery = Parse.LiveQuery;
  Object = Parse.Object;
  Polygon = Parse.Polygon;
  Promise = Parse.Promise;
  Push = Parse.Push;
  Query = Parse.Query;
  Relation = Parse.Relation;
  Role = Parse.Role;
  Session = Parse.Session;
  User = Parse.User.extend({}, {
    roles: function (user, options) {
      const query = new Parse.Query(Parse.Role);
      query.equalTo('users', user || Parse.User.current());
      return query.find(options);
    }
  });

  get current() {
    return this.User.current();
  }

  constructor() {
    const config = new ConfigService();
    Parse.initialize(config.parse.appId, config.parse.javascriptKey);
    Parse.serverURL = config.parse.serverURL;
  }

  reverseQuery(parentClass, relationKey, child) {
    const query = new this.Query(parentClass);
    query.equalTo(relationKey, child);
    return query;
  }

  socket(query: Parse.Query, onlyEvent?: boolean): Observable<any> {
    const subject = new Subject();

    if (!onlyEvent) {
      query.find()
        .then(rows => subject.next({type: 'query', rows: rows}))
        .catch(err => subject.error(err));
    }

    query.subscribe()
      .on('open', () => subject.next({type: 'event', event: 'open'}))
      .on('close', row => subject.next({type: 'event', event: 'close', row: row}))
      .on('create', row => subject.next({type: 'event', event: 'create', row: row}))
      .on('update', row => subject.next({type: 'event', event: 'update', row: row}))
      .on('delete', row => subject.next({type: 'event', event: 'delete', row: row}))
      .on('enter', row => subject.next({type: 'event', event: 'enter', row: row}))
      .on('leave', row => subject.next({type: 'event', event: 'leave', row: row}));

    return subject;
  }

  // 对比
  compareObject(left: any, right: any) {
    return left === right || left.equals(right);
  }

  // 处理catch返回错误
  handleError(err) {
    if (err instanceof Parse.Error) {
      switch (err.code) {
        case Parse.Error.OTHER_CAUSE:
          err.message = '其他原因';
          break;
        case Parse.Error.INTERNAL_SERVER_ERROR:
          err.message = '内部服务器错误';
          break;
        case Parse.Error.CONNECTION_FAILED:
          err.message = '连接失败';
          break;
        case Parse.Error.OBJECT_NOT_FOUND:
          err.message = '数据不存在或验证失败';
          break;
        case Parse.Error.INVALID_QUERY:
          err.message = '无效的查询';
          break;
        case Parse.Error.INVALID_CLASS_NAME:
          err.message = '无效的类名';
          break;
        case Parse.Error.MISSING_OBJECT_ID:
          err.message = '缺少objectId';
          break;
        case Parse.Error.INVALID_KEY_NAME:
          err.message = '无效的key';
          break;
        case Parse.Error.INVALID_POINTER:
          err.message = '无效的pointer';
          break;
        case Parse.Error.INVALID_JSON:
          err.message = '无效的json';
          break;
        case Parse.Error.COMMAND_UNAVAILABLE:
          err.message = '命令不可用';
          break;
        case Parse.Error.NOT_INITIALIZED:
          err.message = '未初始化';
          break;
        case Parse.Error.INCORRECT_TYPE:
          err.message = '不正确的类型';
          break;
        case Parse.Error.INVALID_CHANNEL_NAME:
          err.message = '无效的channel名称';
          break;
        case Parse.Error.PUSH_MISCONFIGURED:
          err.message = '消息推送配置错误';
          break;
        case Parse.Error.OBJECT_TOO_LARGE:
          err.message = '目标太大';
          break;
        case Parse.Error.OPERATION_FORBIDDEN:
          err.message = '操作被禁止';
          break;
        case Parse.Error.CACHE_MISS:
          err.message = '缓存缺失';
          break;
        case Parse.Error.INVALID_NESTED_KEY:
          err.message = '无效的nested键值';
          break;
        case Parse.Error.INVALID_FILE_NAME:
          err.message = '无效的文件名';
          break;
        case Parse.Error.INVALID_ACL:
          err.message = '无效的ACL';
          break;
        case Parse.Error.INVALID_EMAIL_ADDRESS:
          err.message = '无效的邮箱地址';
          break;
        case Parse.Error.MISSING_CONTENT_TYPE:
          err.message = '缺少content-type';
          break;
        case Parse.Error.MISSING_CONTENT_LENGTH:
          err.message = '缺少content-length';
          break;
        case Parse.Error.INVALID_CONTENT_LENGTH:
          err.message = '无效内容长度';
          break;
        case Parse.Error.FILE_TOO_LARGE:
          err.message = '文件太大';
          break;
        case Parse.Error.FILE_SAVE_ERROR:
          err.message = '文件保存错误';
          break;
        case Parse.Error.DUPLICATE_VALUE:
          err.message = '重复的值';
          break;
        case Parse.Error.INVALID_ROLE_NAME:
          err.message = '无效的角色名';
          break;
        case Parse.Error.EXCEEDED_QUOTA:
          err.message = '超过定额';
          break;
        case Parse.Error.SCRIPT_FAILED:
          err.message = '脚本失败';
          break;
        case Parse.Error.VALIDATION_ERROR:
          err.message = '验证错误';
          break;
        case Parse.Error.INVALID_IMAGE_DATA:
          err.message = '无效的图像数据';
          break;
        case Parse.Error.UNSAVED_FILE_ERROR:
          err.message = '保存文件时出错';
          break;
        case Parse.Error.INVALID_PUSH_TIME_ERROR:
          err.message = '无效的推送时间';
          break;
        case Parse.Error.FILE_DELETE_ERROR:
          err.message = '文件删除失败';
          break;
        case Parse.Error.REQUEST_LIMIT_EXCEEDED:
          err.message = '请求超出限制';
          break;
        case Parse.Error.INVALID_EVENT_NAME:
          err.message = '无效的事件名称';
          break;
        case Parse.Error.USERNAME_MISSING:
          err.message = '缺少用户名';
          break;
        case Parse.Error.PASSWORD_MISSING:
          err.message = '缺少密码';
          break;
        case Parse.Error.USERNAME_TAKEN:
          err.message = '用户名已存在';
          break;
        case Parse.Error.EMAIL_TAKEN:
          err.message = '邮箱已存在';
          break;
        case Parse.Error.EMAIL_MISSING:
          err.message = '缺少邮箱';
          break;
        case Parse.Error.EMAIL_NOT_FOUND:
          err.message = '邮箱未认证或不存在';
          break;
        case Parse.Error.SESSION_MISSING:
          err.message = '数据不能被操作';
          break;
        case Parse.Error.MUST_CREATE_USER_THROUGH_SIGNUP:
          err.message = '必须通过注册创建用户';
          break;
        case Parse.Error.ACCOUNT_ALREADY_LINKED:
          err.message = '账号已关联';
          break;
        case Parse.Error.INVALID_SESSION_TOKEN:
          err.message = '身份已过期，请重新登录';
          Parse.User.logOut();
          break;
        case Parse.Error.LINKED_ID_MISSING:
          err.message = '缺少关联id';
          break;
        case Parse.Error.INVALID_LINKED_SESSION:
          err.message = '无效的关联会话';
          break;
        case Parse.Error.UNSUPPORTED_SERVICE:
          err.message = '不支持的服务';
          break;
        case Parse.Error.INVALID_SCHEMA_OPERATION:
          err.message = '无效的schema操作';
          break;
        case Parse.Error.AGGREGATE_ERROR:
          err.message = '部分数据操作失败';
          break;
        case Parse.Error.FILE_READ_ERROR:
          err.message = '文件读取错误';
          break;
        case Parse.Error.X_DOMAIN_REQUEST:
          err.message = '跨域请求';
          break;
      }
      return Parse.Promise.reject(err);
    }
  }

}
