import {NgModule} from '@angular/core';

import {ServicesModule} from '~shared/services/services.module';
import {EditorComponent} from './editor.component';

@NgModule({
  imports: [ServicesModule],
  declarations: [EditorComponent],
  exports: [EditorComponent]
})
export class EditorModule {
}
