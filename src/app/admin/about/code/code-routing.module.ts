import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {CodeComponent} from './code.component';

export const routerConfig: Route[] = [
    {path: 'code', component: CodeComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class CodeRoutingModule {
}
