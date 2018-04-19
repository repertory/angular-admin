import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ForgetComponent} from './forget.component';

const routes: Routes = [
  {
    path: 'forget',
    component: ForgetComponent,
    data: {
      title: '找回密码'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetRoutingModule {
}
