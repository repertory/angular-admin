import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MenuComponent} from './menu.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent,
    loadChildren: './menu-children.module#MenuChildrenModule',
    data: {
      title: '菜单管理'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {
}
