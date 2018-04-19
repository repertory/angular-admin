import {NgModule} from '@angular/core';
import {SharedModule} from '~shared/shared.module';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
import {UserService} from './user.service';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [ProfileComponent],
  providers: [UserService]
})
export class ProfileModule {
}
