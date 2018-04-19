import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProfileComponent} from './profile.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: '个人资料',
      help: '/help/user-profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
