import {NgModule} from '@angular/core';
import {SharedModuleModule} from './shared-module.module';

import {ComponentsModule} from './components/components.module'
import {DirectivesModule} from './directives/directives.module'
import {PipesModule} from './pipes/pipes.module'
import {ServicesModule} from './services/services.module';

export * from './components/components.module';
export * from './services/services.module';

@NgModule({
  imports: [
    ServicesModule,
  ],
  exports: [
    SharedModuleModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ]
})
export class SharedModule {
}
