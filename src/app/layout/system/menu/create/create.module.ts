import {NgModule} from '@angular/core';
import {SharedModule} from '~shared/shared.module';

import {CreateRoutingModule} from './create-routing.module';
import {CreateComponent} from './create.component';
import {MenuService} from './menu.service';

@NgModule({
  imports: [
    SharedModule,
    CreateRoutingModule
  ],
  declarations: [CreateComponent],
  providers: [MenuService]
})
export class CreateModule {
}
