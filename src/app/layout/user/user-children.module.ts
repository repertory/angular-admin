import {NgModule} from '@angular/core';

import {MessageModule} from './message/message.module';
import {ProfileModule} from './profile/profile.module';

@NgModule({
  imports: [
    MessageModule,
    ProfileModule,
  ]
})
export class UserChildrenModule {
}
