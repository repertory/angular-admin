import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {AdminComponent} from './admin.component';

export const routerConfig: Route[] = [
    {path: 'admin', component: AdminComponent, loadChildren: './admin-children.module#AdminChildrenModule'}
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
