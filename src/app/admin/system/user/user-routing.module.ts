import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {UserComponent} from './user.component';
import {UserService} from './user.service';

export const routerConfig: Route[] = [
    {path: 'user', component: UserComponent, canDeactivate: [UserService]}
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
