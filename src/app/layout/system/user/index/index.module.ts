import {NgModule} from '@angular/core';
import {SharedModule} from '~shared/shared.module';

import {IndexRoutingModule} from './index-routing.module';
import {IndexComponent} from './index.component';
import {UserService} from './user.service';

@NgModule({
  imports: [
    SharedModule,
    IndexRoutingModule
  ],
  declarations: [IndexComponent],
  providers: [UserService]
})
export class IndexModule {
}
