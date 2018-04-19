import {NgModule} from '@angular/core';
import {SharedModule} from '~shared/shared.module';

import {EditRoutingModule} from './edit-routing.module';
import {EditComponent} from './edit.component';
import {UserService} from './user.service';

@NgModule({
  imports: [
    SharedModule,
    EditRoutingModule
  ],
  declarations: [EditComponent],
  providers: [UserService]
})
export class EditModule {
}
