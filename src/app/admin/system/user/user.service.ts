import {Injectable} from '@angular/core';
import {
    CanDeactivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import {UserComponent} from './user.component';

@Injectable()
export class UserService implements CanDeactivate<UserComponent> {

    canDeactivate(component: UserComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        console.log('UserService#canDeactivate called', state.url, '确认页面离开功能');

        return true;
    }

}
