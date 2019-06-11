import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
