import {NgModule} from '@angular/core';
import {SharedModule} from '~shared/shared.module';

import {IndexRoutingModule} from './index-routing.module';
import {IndexComponent} from './index.component';
import {MenuService} from './menu.service';

@NgModule({
  imports: [
    SharedModule,
    IndexRoutingModule
  ],
  declarations: [IndexComponent],
  providers: [MenuService]
})
export class IndexModule {
}
