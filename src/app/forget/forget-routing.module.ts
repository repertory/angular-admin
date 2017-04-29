import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {ForgetComponent} from './forget.component';

export const routerConfig: Route[] = [
    {path: 'forget', component: ForgetComponent},
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class ForgetRoutingModule {
}
