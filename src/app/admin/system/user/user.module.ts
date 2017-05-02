import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';

@NgModule({
    imports: [
        SharedModule,
        UserRoutingModule
    ],
    declarations: [UserComponent]
})
export class UserModule {
}
