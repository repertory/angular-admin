import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';

import {
    SharedModule as AdminSharedModule,
    LoginDialog,
    RegisterDialog,
    ForgetDialog
} from './shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule,
        AdminSharedModule,
    ],
    declarations: [AdminComponent],
    entryComponents: [
        LoginDialog,
        RegisterDialog,
        ForgetDialog
    ]
})
export class AdminModule {
}
