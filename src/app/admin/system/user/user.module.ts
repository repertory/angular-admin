import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {UserService} from './user.service';

@NgModule({
    imports: [
        SharedModule,
        UserRoutingModule
    ],
    providers: [
        UserService
    ],
    declarations: [UserComponent]
})
export class UserModule {
}
