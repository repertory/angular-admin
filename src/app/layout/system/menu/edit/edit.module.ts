import {NgModule} from '@angular/core';
import {SharedModule} from '~shared/shared.module';

import {EditRoutingModule} from './edit-routing.module';
import {EditComponent} from './edit.component';
import {MenuService} from './menu.service';

@NgModule({
  imports: [
    SharedModule,
    EditRoutingModule
  ],
  declarations: [EditComponent],
  providers: [MenuService]
})
export class EditModule {
}
