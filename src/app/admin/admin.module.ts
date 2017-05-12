import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminGuardService} from './admin-guard.service';
import {AdminComponent} from './admin.component';

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule,
    ],
    providers: [
        AdminGuardService
    ],
    declarations: [AdminComponent],
})
export class AdminModule {
}
