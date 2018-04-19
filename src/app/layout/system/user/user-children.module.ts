import {NgModule} from '@angular/core';

import {CreateModule} from './create/create.module';
import {EditModule} from './edit/edit.module';
import {IndexModule} from './index/index.module';

@NgModule({
  imports: [
    CreateModule,
    EditModule,
    IndexModule,
  ]
})
export class UserChildrenModule {
}
