import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {ParseService, ShowService} from '~shared/services/services.module';

@Injectable()
export class UserService extends ParseService {

  protected database = this.User;

  private subscriptions: Array<Subscription> = [];

  roles = [];
  notifications = [];

  constructor(private router: Router, private show: ShowService) {
    super();
  }

  onInit() {
    this.loadRoles();

    // 监听消息变化
    const notification = this.notification()
      .subscribe(data => {
          switch (data.type) {
            case 'query':
              this.notifications = data.rows;
              break;
            case 'event':
              switch (data.event) {
                case 'create':
                case 'enter':
                  // 处理新消息
                  if (!this.notifications.find(x => x.equals(data.row))) {
                    this.notifications.push(data.row);
                    this.show.info(`您有${this.notifications.length}条新的消息，请注意查收！`);
                  }
                  break;
                case 'update':
                  // 处理已读消息
                  if (this.notifications.find(x => x.equals(data.row))) {
                    const query = new this.Query('Notification');
                    query.equalTo('objectId', data.row.id);
                    query.notEqualTo('readBy', this.current);
                    query.notEqualTo('deletedBy', this.current);
                    query.greaterThanOrEqualTo('createdAt', this.current.get('createdAt'));
                    query.count()
                      .then(count => {
                        if (!count) {
                          this.notifications = this.notifications.filter(x => !x.equals(data.row));
                        }
                      });
                  }
                  break;
                case 'delete':
                case 'leave':
                  // 处理删除消息
                  this.notifications = this.notifications.filter(x => !x.equals(data.row));
                  break;
              }
              break;
          }
        },
        () => this.notifications = []);
    this.subscriptions.push(notification);
  }

  onDestroy() {
    this.roles = [];
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  status(): Promise<string> {
    if (!this.current) {
      this.logout(true);
    }
    return this.Promise.resolve(this.current ? 'login' : 'logout');
  }

  notification(): Observable<any> {
    const query = new this.Query('Notification');
    query.addDescending('createdAt');
    query.notEqualTo('readBy', this.current);
    query.notEqualTo('deletedBy', this.current);
    query.greaterThanOrEqualTo('createdAt', this.current.get('createdAt'));
    return this.socket(query);
  }

  loadRoles(): Promise<any> {
    if (!this.current) {
      this.roles = [];
      return this.Promise.resolve([]);
    }
    return this.User.roles()
      .then(rows => {
        this.roles = rows;
        return this.Promise.resolve(rows);
      })
      .catch(this.handleError);
  }

  logout(force?: boolean) {
    const action = force ?
      this.Promise.resolve(true) :
      this.show.confirm({title: '系统提示', content: '确定要退出登录吗？'});

    action.then(() => this.User.logOut())
      .then(() => {
        this.roles = [];
        this.show.success('已退出登录');
        this.router.navigate(['/login']);
      })
      .catch(() => {
      });
  }

  hasRole(names: string[]): boolean {
    return this.roles.some(role => names.includes(role.get('name')));
  }

  hasWriteAccess(data): boolean {
    let access = this.hasRole(['root', 'admin']);
    if (!access) {
      access = data.getACL().getPublicWriteAccess();
    }
    if (!access && this.current) {
      access = data.getACL().getWriteAccess(this.current);
    }
    if (!access && this.roles.length) {
      access = this.roles.map(role => data.getACL().getRoleWriteAccess(role)).includes(true);
    }
    return access;
  }

  checkRole(names: string[], redirect?: any[]): Promise<any> {
    const load = this.roles.length ? this.Promise.resolve(this.roles) : this.loadRoles();
    return load
      .then(roles => {
        const exist = roles.some(role => names.includes(role.get('name')));
        if (!exist) {
          this.router.navigate(redirect || ['/error/403']);
          return this.Promise.reject(false);
        }
        return this.Promise.resolve(true);
      })
      .catch(() => this.Promise.reject(false));
  }

}
