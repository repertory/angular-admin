import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HelpComponent} from './help.component';

const routes: Routes = [
  {
    path: 'help',
    component: HelpComponent,
    data: {
      title: '帮助中心'
    }
  },
  {
    path: 'help/:path',
    component: HelpComponent,
    data: {
      title: '帮助中心'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule {
}
