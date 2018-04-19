import {NgModule} from '@angular/core';

import {SharedModule} from '~shared/shared.module';

import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './register.component';
import {UserService} from './user.service';

@NgModule({
  imports: [
    SharedModule,
    RegisterRoutingModule
  ],
  declarations: [RegisterComponent],
  providers: [UserService]
})
export class RegisterModule {
}
