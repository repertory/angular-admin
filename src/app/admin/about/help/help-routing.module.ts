import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {HelpComponent} from './help.component';

export const routerConfig: Route[] = [
    {path: 'help', component: HelpComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class HelpRoutingModule {
}
