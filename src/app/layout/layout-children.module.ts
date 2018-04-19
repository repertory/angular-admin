import {NgModule} from '@angular/core';

import {HelpModule} from './help/help.module';
import {IndexModule} from './index/index.module';
import {SystemModule} from './system/system.module';
import {UserModule} from './user/user.module';

@NgModule({
  imports: [
    HelpModule,
    IndexModule,
    SystemModule,
    UserModule
  ]
})
export class LayoutChildrenModule {
}
