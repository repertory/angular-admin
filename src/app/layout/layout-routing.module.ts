import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LayoutComponent} from './layout.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: './layout-children.module#LayoutChildrenModule',
    canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
