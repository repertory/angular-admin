import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {RoleComponent} from './role.component';

export const routerConfig: Route[] = [
    {path: 'role', component: RoleComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class RoleRoutingModule {
}
