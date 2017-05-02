import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {AboutComponent} from './about.component';

export const routerConfig: Route[] = [
    {path: 'about', component: AboutComponent, loadChildren: './about-children.module#AboutChildrenModule'}
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class AboutRoutingModule {
}
