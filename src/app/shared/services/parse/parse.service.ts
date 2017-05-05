import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
import {Parse} from 'parse';

@Injectable()
export class ParseService {
    ACL: Parse.ACL = Parse.ACL;
    Analytics: Parse.Analytics = Parse.Analytics;
    Config: Parse.Config = Parse.Config;
    Cloud: Parse.Cloud = Parse.Cloud;
    Error: Parse.Error = Parse.Error;
    File: Parse.File = Parse.File;
    GeoPoint: Parse.GeoPoint = Parse.GeoPoint;
    Object: Parse.Object = Parse.Object;
    Push: Parse.Push = Parse.Push;
    Query: Parse.Query = Parse.Query;
    Role: Parse.Role = Parse.Role;
    Session: Parse.Session = Parse.Session;
    User: Parse.User = Parse.User;

    // 初始化配置
    initialize(parseConfig) {
        Parse.initialize(parseConfig.appId, parseConfig.javascriptKey);
        Parse.serverURL = parseConfig.serverURL;
    }

    // 行为跟踪(数据分析用)
    track(eventName: string, dimensions: Object, options?: Object): Observable<any> {
        const dimensions2 = {};

        for (const key of Object.keys(dimensions)) {
            dimensions2[key] = dimensions[key].toString();
        }

        return Observable.fromPromise(this.Analytics.track(eventName, dimensions2, options));
    }

    // 运行自定义函数
    run(name: string, data?: Object, options?: Object): Observable<any> {
        return Observable.fromPromise(this.Cloud.run(name, data, options));
    }

    // 运行自定义作业
    job(name: string, func: Function): Observable<any> {
        return Observable.fromPromise(this.Cloud.job(name, func));
    }

    // 文件上传
    file(file: File): Observable<any> {
        const subject = new Subject();

        if (!file) {
            subject.error('未选择文件');
            return subject;
        }

        const name = encodeURIComponent(file.name)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A')
            .replace(/\+/g, '%20')
            .replace(/\%/g, '');

        new this.File(name, file).save().then(
            res => subject.next(res),
            err => subject.error(err)
        );
        return subject;
    }

    // base64上传
    base64(base64: string, name?: string): Observable<any> {
        name = encodeURIComponent(name || 'base64.png')
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A')
            .replace(/\+/g, '%20')
            .replace(/\%/g, '');

        return Observable.fromPromise(this.File(name, {base64: base64}).save());
    }

    // 当前用户信息
    userInfo(): Observable<any> {
        return Observable
            .interval(200)
            .map(x => this.User.current())
            .distinctUntilChanged();
    }

    // 重置密码
    forget(email: string): Observable<any> {
        return Observable.fromPromise(this.User.requestPasswordReset(email));
    }

    // 用户登录
    login(username: string, password: string): Observable<any> {
        return Observable.fromPromise(this.User.logIn(username, password));
    }

    // 退出登录
    logout(): Observable<any> {
        return Observable.fromPromise(this.User.logOut());
    }

    // 用户注册
    register(username: string, password: string, attributes?: Object): Observable<any> {
        const object = new this.User();
        object.set('username', username);
        object.set('password', password);

        if (attributes) {
            for (const key of Object.keys(attributes)) {
                object.set(key, attributes[key]);
            }
        }

        return Observable.fromPromise(object.signUp());
    }

    // 查询数据
    query(className: string, callback?: Function, isSocket?: boolean): Observable<any> {
        const subject = new Subject();
        const query = new this.Query(className);

        if (callback) {
            callback(query);
        }

        query.find({
            success: res => subject.next({type: 'result', result: res}),
            error: err => subject.error(err)
        });

        if (isSocket) {
            query.subscribe()
                .on('open', () => subject.next({type: 'event', event: 'open'}))
                .on('close', () => subject.next({type: 'event', event: 'close'}))
                .on('create', data => subject.next({type: 'event', event: 'create', data: data}))
                .on('update', data => subject.next({type: 'event', event: 'update', data: data}))
                .on('delete', data => subject.next({type: 'event', event: 'delete', data: data}))
                .on('enter', data => subject.next({type: 'event', event: 'enter', data: data}))
                .on('leave', data => subject.next({type: 'event', event: 'leave', data: data}));
        }

        return subject;
    }

    // 新增数据
    create(className: string, data: Object): Observable<any> {
        const name = this.Object.extend(className);
        const object = new name();

        for (const key of Object.keys(data)) {
            object.set(key, data[key]);
        }

        if (this.User.current()) {
            object.set('createdBy', this.User.current());
        }

        return Observable.fromPromise(object.save());
    }

    // 修改数据
    update(object: Parse.Object, data: Object): Observable<any> {
        for (const key of Object.keys(data)) {
            object.set(key, data[key]);
        }

        if (this.User.current()) {
            object.set('updatedBy', this.User.current());
        } else {
            object.unset('updatedBy');
        }

        return Observable.fromPromise(object.save());
    }

    // 删除数据
    delete(object: Parse.Object): Observable<any> {
        return Observable.fromPromise(object.destroy());
    }
}
