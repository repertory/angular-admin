import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {UserComponent} from './user.component';

export const routerConfig: Route[] = [
    {path: 'user', component: UserComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
