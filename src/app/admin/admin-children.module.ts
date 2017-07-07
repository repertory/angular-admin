import {NgModule} from '@angular/core';

import {IndexModule} from './index/index.module';
import {SystemModule} from './system/system.module';

@NgModule({
  imports: [
    IndexModule,
    SystemModule,
  ]
})
export class AdminChildrenModule {
}
