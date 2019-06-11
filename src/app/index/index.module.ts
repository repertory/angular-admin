import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatCheckboxModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
} from '@angular/material';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    IndexRoutingModule
  ]
})
export class IndexModule { }
