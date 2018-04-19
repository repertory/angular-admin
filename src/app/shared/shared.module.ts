import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {MaterialModule} from './material/material.module';
import {ComponentsModule} from './components/components.module';
import {DirectivesModule} from './directives/directives.module';
import {PipesModule} from './pipes/pipes.module';
import {ServicesModule} from './services/services.module';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ComponentsModule,
    DirectivesModule,
    PipesModule,
    ServicesModule,
  ],
  providers: [
    FormBuilder
  ]
})
export class SharedModule {
}

export * from './services/services.module';
