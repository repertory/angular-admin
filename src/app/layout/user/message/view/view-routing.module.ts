import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ViewComponent} from './view.component';

const routes: Routes = [
  {
    path: ':id',
    component: ViewComponent,
    data: {
      title: '消息详情',
      back: '/user/message'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewRoutingModule {
}
