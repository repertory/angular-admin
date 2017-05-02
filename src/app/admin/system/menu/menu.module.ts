import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';
import {MenuRoutingModule} from './menu-routing.module';
import {MenuComponent} from './menu.component';

@NgModule({
    imports: [
        SharedModule,
        MenuRoutingModule
    ],
    declarations: [MenuComponent]
})
export class MenuModule {
}
