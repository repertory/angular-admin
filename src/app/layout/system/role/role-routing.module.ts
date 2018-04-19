import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RoleComponent} from './role.component';

const routes: Routes = [
  {
    path: 'role',
    component: RoleComponent,
    loadChildren: './role-children.module#RoleChildrenModule',
    data: {
      title: '角色管理'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule {
}
