import {NgModule} from '@angular/core';
import {SharedModule} from '~shared/shared.module';

import {CreateRoutingModule} from './create-routing.module';
import {CreateComponent} from './create.component';
import {UserService} from './user.service';

@NgModule({
  imports: [
    SharedModule,
    CreateRoutingModule
  ],
  declarations: [CreateComponent],
  providers: [UserService]
})
export class CreateModule {
}
