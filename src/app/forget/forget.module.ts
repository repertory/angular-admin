import {NgModule} from '@angular/core';

import {SharedModule} from '~shared/shared.module';

import {ForgetRoutingModule} from './forget-routing.module';
import {ForgetComponent} from './forget.component';
import {UserService} from './user.service';

@NgModule({
  imports: [
    SharedModule,
    ForgetRoutingModule
  ],
  declarations: [ForgetComponent],
  providers: [UserService]
})
export class ForgetModule {
}
