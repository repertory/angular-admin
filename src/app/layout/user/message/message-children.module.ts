import {NgModule} from '@angular/core';

import {CreateModule} from './create/create.module';
import {IndexModule} from './index/index.module';
import {ViewModule} from './view/view.module';

@NgModule({
  imports: [
    CreateModule,
    IndexModule,
    ViewModule,
  ]
})
export class MessageChildrenModule {
}
