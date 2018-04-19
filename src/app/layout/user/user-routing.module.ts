import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserComponent} from './user.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    loadChildren: '~layout/user/user-children.module#UserChildrenModule',
    data: {
      title: '用户中心'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
