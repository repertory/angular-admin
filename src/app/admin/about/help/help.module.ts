import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';
import {HelpRoutingModule} from './help-routing.module';
import {HelpComponent} from './help.component';

@NgModule({
    imports: [
        SharedModule,
        HelpRoutingModule
    ],
    declarations: [HelpComponent]
})
export class HelpModule {
}
