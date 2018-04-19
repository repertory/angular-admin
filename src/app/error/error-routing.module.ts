import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ErrorComponent} from './error.component';

const routes: Routes = [
  {
    path: 'error/:code',
    component: ErrorComponent,
    data: {
      title: '出错啦'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule {
}
