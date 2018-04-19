import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterComponent} from './register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: '用户注册'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {
}
