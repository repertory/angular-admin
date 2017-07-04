import {NgModule} from '@angular/core';

import {SharedModuleModule} from '../../shared-module.module';
import {HeaderComponent} from './header.component';

@NgModule({
  imports: [
    SharedModuleModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {
}
