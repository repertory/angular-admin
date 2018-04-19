import {NgModule} from '@angular/core';
import {SharedModule} from '~shared/shared.module';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {UserService} from './user.service';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [UserService]
})
export class LoginModule {
}
