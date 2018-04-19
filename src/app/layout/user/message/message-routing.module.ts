import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MessageComponent} from './message.component';

const routes: Routes = [
  {
    path: 'message',
    component: MessageComponent,
    loadChildren: './message-children.module#MessageChildrenModule',
    data: {
      title: '我的消息'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule {
}
