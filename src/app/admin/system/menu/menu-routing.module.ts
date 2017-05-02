import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {MenuComponent} from './menu.component';

export const routerConfig: Route[] = [
    {path: 'menu', component: MenuComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class MenuRoutingModule {
}
