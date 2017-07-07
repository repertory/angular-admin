import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {SystemComponent} from './system.component';

export const routerConfig: Route[] = [
  {path: 'system', component: SystemComponent, loadChildren: './system-children.module#SystemChildrenModule'}
];

@NgModule({
  imports: [
    RouterModule.forChild(routerConfig)
  ],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
