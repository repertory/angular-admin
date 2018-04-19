import {Injectable} from '@angular/core';
import {CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {MenuService} from './menu.service';
import {UserService} from './user.service';

@Injectable()
export class AuthGuard implements CanActivateChild {

  routesWithoutAccess = [
    '/index',
    '/help',
    '/user/',
  ];

  constructor(private user: UserService, private menu: MenuService, private router: Router) {
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // 登录验证
    if (!this.user.current) {
      this.router.navigate(['/login', {next: state.url}]);
      return false;
    }

    // 权限验证，同时先获取菜单数据
    return this.menu.load()
      .then(rows => {

        // 跳过权限验证
        if (this.routesWithoutAccess.find(route => route.endsWith('/') ? state.url.startsWith(route) : state.url === route)) {
          return Promise.resolve(true);
        }

        // 权限验证
        const hasAccess = !!rows.filter(row => row.has('url') && row.get('url'))
          .find(row => state.url.startsWith(row.get('url')));

        if (!hasAccess) {
          this.router.navigate(['/error/403', {next: state.url}]);
        }
        return Promise.resolve(hasAccess);
      })
      .catch(err => {
        if (err.code === 100) {
          this.router.navigate(['/error/503', {next: state.url}]);
        } else if (!this.user.current) {
          this.router.navigate(['/login', {next: state.url}]);
        } else {
          this.router.navigate(['/error/403', {next: state.url}]);
        }
        return Promise.resolve(false);
      });
  }

}
