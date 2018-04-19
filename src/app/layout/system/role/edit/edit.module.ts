import {NgModule} from '@angular/core';
import {SharedModule} from '~shared/shared.module';

import {EditRoutingModule} from './edit-routing.module';
import {EditComponent} from './edit.component';
import {RoleService} from './role.service';

@NgModule({
  imports: [
    SharedModule,
    EditRoutingModule
  ],
  declarations: [EditComponent],
  providers: [RoleService]
})
export class EditModule {
}
