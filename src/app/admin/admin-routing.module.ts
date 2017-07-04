import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {AdminComponent} from './admin.component';
import {AdminGuardService} from './admin-guard.service';

export const routerConfig: Route[] = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivateChild: [AdminGuardService],
    loadChildren: './admin-children.module#AdminChildrenModule'
  },
  {path: '', redirectTo: 'admin/index', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forChild(routerConfig)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
