import {NgModule} from '@angular/core';

import {AdminModule} from './admin/admin.module';
import {ErrorModule} from './error/error.module';
import {ForgetModule} from './forget/forget.module';
import {HomeModule} from './home/home.module';
import {LoginModule} from './login/login.module';
import {RegisterModule} from './register/register.module';

@NgModule({
    imports: [
        AdminModule,
        ErrorModule,
        ForgetModule,
        HomeModule,
        LoginModule,
        RegisterModule,
    ]
})
export class AppChildrenModule {
}
