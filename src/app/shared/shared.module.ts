import {NgModule} from '@angular/core';
import {SharedModuleModule} from './shared-module.module';

import {ComponentsModule} from './components/components.module'
import {DirectivesModule} from './directives/directives.module'
import {ServicesModule} from './services/services.module';

export * from './animations/animations.module';
export * from './services/services.module';

@NgModule({
    imports: [ServicesModule],
    exports: [
        SharedModuleModule,
        ComponentsModule,
        DirectivesModule,
    ]
})
export class SharedModule {
}
