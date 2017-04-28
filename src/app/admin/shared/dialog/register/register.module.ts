import {NgModule} from '@angular/core';

import {SharedModule} from '../../../../shared/shared.module';
import {RegisterComponent} from './register.component';
export {RegisterComponent as RegisterDialog} from './register.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [RegisterComponent]
})
export class RegisterModule {
}
