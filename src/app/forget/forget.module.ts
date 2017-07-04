import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';

import {ForgetRoutingModule} from './forget-routing.module';
import {ForgetComponent} from './forget.component';

@NgModule({
  imports: [
    SharedModule,
    ForgetRoutingModule,
  ],
  declarations: [ForgetComponent]
})
export class ForgetModule {
}
