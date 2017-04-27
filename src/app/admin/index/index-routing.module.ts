import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {IndexComponent} from './index.component';

export const routerConfig: Route[] = [
    {path: 'index', component: IndexComponent},
    {path: '', redirectTo: '/admin/index', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class IndexRoutingModule {
}
