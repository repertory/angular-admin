import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {EditComponent} from './edit.component';

const routes: Routes = [
  {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: '编辑菜单',
      back: '/system/menu'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule {
}
