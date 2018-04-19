import {NgModule} from '@angular/core';
import {SharedModule} from '~shared/shared.module';

import {ViewRoutingModule} from './view-routing.module';
import {ViewComponent} from './view.component';
import {NotificationService} from './notification.service';

@NgModule({
  imports: [
    SharedModule,
    ViewRoutingModule
  ],
  declarations: [ViewComponent],
  providers: [NotificationService]
})
export class ViewModule {
}
