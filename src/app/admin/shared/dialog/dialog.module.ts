import {NgModule} from '@angular/core';

import {ForgetModule} from './forget/forget.module';
export * from './forget/forget.module';

import {LoginModule} from './login/login.module';
export * from './login/login.module';

import {RegisterModule} from './register/register.module';
export * from './register/register.module';

@NgModule({
    exports: [
        ForgetModule,
        LoginModule,
        RegisterModule
    ]
})
export class DialogModule {
}
