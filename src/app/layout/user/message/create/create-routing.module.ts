import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CreateComponent} from './create.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
    data: {
      title: '发布消息',
      back: '/user/message'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule {
}
