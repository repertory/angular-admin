import {NgModule} from '@angular/core';
import {SharedModule} from '~shared/shared.module';

import {IndexRoutingModule} from './index-routing.module';
import {IndexComponent} from './index.component';
import {RoleService} from './role.service';

@NgModule({
  imports: [
    SharedModule,
    IndexRoutingModule
  ],
  declarations: [IndexComponent],
  providers: [RoleService]
})
export class IndexModule {
}
