import {NgModule} from '@angular/core';

import {HomeModule} from './home/home.module';
import {AdminModule} from './admin/admin.module';
import {LoginModule} from './login/login.module';
import {ForgetModule} from './forget/forget.module';
import {RegisterModule} from './register/register.module';

@NgModule({
    imports: [
        HomeModule,
        AdminModule,
        LoginModule,
        ForgetModule,
        RegisterModule,
    ]
})
export class AppChildrenModule {
}
