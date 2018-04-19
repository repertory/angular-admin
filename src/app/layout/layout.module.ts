import {NgModule} from '@angular/core';
import {SharedModule} from '~shared/shared.module';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {AuthGuard} from './auth.guard';
import {MenuService} from './menu.service';
import {UserService} from './user.service';

@NgModule({
  imports: [
    SharedModule,
    LayoutRoutingModule
  ],
  declarations: [LayoutComponent],
  providers: [
    AuthGuard,
    MenuService,
    UserService,
  ]
})
export class LayoutModule {
}
