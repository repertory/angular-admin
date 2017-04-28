import {NgModule} from '@angular/core';

import {SharedModule} from '../../../../shared/shared.module';

import {LoginComponent} from './login.component';
export {LoginComponent as LoginDialog} from './login.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
