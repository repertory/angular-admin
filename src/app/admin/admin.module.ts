import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminGuardService} from './admin-guard.service';
import {AdminMenuService} from './admin-menu.service';
import {AdminUserService} from './admin-user.service';
import {AdminComponent} from './admin.component';

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule,
    ],
    providers: [
        AdminGuardService,
        AdminMenuService,
        AdminUserService,
    ],
    declarations: [AdminComponent],
})
export class AdminModule {
}
