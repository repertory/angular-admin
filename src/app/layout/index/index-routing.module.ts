import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
    data: {
      title: '首页'
    }
  },
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {
}
