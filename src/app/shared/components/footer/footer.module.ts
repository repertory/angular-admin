import {NgModule} from '@angular/core';

import {SharedModuleModule} from '../../shared-module.module';

import {FooterComponent} from './footer.component';

@NgModule({
    imports: [
        SharedModuleModule
    ],
    declarations: [FooterComponent],
    exports: [FooterComponent]
})
export class FooterModule {
}
