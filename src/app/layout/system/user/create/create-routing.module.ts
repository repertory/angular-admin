import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CreateComponent} from './create.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
    data: {
      title: '添加用户',
      back: '/system/user'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule {
}
