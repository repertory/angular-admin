import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '~shared/material/material.module';

import {ConfigModule} from '../config/config.module';

import {ShowAlertComponent, ShowConfirmComponent, ShowPromptComponent} from './show.component';
import {ShowService} from './show.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ConfigModule
  ],
  declarations: [
    ShowAlertComponent,
    ShowConfirmComponent,
    ShowPromptComponent
  ],
  entryComponents: [
    ShowAlertComponent,
    ShowConfirmComponent,
    ShowPromptComponent
  ],
  exports: [
    ShowAlertComponent,
    ShowConfirmComponent,
    ShowPromptComponent
  ],
  providers: [ShowService],
})
export class ShowModule {
}

export {ShowService} from './show.service';
