import {Injectable} from '@angular/core';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ParseService} from '../../../shared/shared.module';

import {UserComponent} from './user.component';

@Injectable()
export class UserService implements CanDeactivate<UserComponent> {
    constructor(private parse: ParseService) {
    }

    canDeactivate(component: UserComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        console.log('UserService#canDeactivate called', state.url, '确认页面离开功能');

        // 未登录时直接跳转
        if (!this.parse.User.current()) {
            return true;
        }

        return component.leaveConfirm();
    }

}
