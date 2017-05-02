import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {SettingComponent} from './setting.component';

export const routerConfig: Route[] = [
    {path: 'setting', component: SettingComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class SettingRoutingModule {
}
