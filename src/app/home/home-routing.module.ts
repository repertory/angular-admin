import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {HomeComponent} from './home.component';

export const routerConfig: Route[] = [
    {path: '', component: HomeComponent, loadChildren: './home-children.module#HomeChildrenModule'}
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
