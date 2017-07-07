import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import {ParseService} from '../shared/shared.module';

@Injectable()
export class AdminGuardService implements CanActivateChild {

  constructor(private parse: ParseService, private router: Router) {
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AdminGuardService#canActivateChild called', state.url, '验证登录和权限功能');

    return this.checkLogin(route, state);
  }

  checkLogin(route, state) {
    // 不用登录
    if (!state.url.startsWith('/admin')) {
      return true;
    }

    // 已登录
    if (this.parse.User.current()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
