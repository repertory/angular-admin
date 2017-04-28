import {NgModule} from '@angular/core';

import {SharedModule} from '../../../../shared/shared.module';

import {ForgetComponent} from './forget.component';
export {ForgetComponent as ForgetDialog} from './forget.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [ForgetComponent]
})
export class ForgetModule {
}
