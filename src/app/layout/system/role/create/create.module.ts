import {NgModule} from '@angular/core';
import {SharedModule} from '~shared/shared.module';

import {CreateRoutingModule} from './create-routing.module';
import {CreateComponent} from './create.component';
import {RoleService} from './role.service';

@NgModule({
  imports: [
    SharedModule,
    CreateRoutingModule
  ],
  declarations: [CreateComponent],
  providers: [RoleService]
})
export class CreateModule {
}
