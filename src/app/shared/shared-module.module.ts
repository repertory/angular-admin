import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {FlexLayoutModule} from '@angular/flex-layout';
import {CdkTableModule} from '@angular/cdk';
import {MaterialModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpModule,
    FlexLayoutModule,
    CdkTableModule,
    MaterialModule,
  ]
})
export class SharedModuleModule {
}
