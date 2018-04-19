import {NgModule} from '@angular/core';
import {SharedModule} from '~shared/shared.module';

import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';

@NgModule({
  imports: [
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [SystemComponent]
})
export class SystemModule {
}
