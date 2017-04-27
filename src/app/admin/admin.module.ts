import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent, AdminLoginComponent, AdminRegisterComponent, AdminForgetComponent} from './admin.component';

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule
    ],
    declarations: [AdminComponent, AdminLoginComponent, AdminRegisterComponent, AdminForgetComponent],
    entryComponents: [AdminLoginComponent, AdminRegisterComponent, AdminForgetComponent]
})
export class AdminModule {
}
