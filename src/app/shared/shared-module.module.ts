import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdChipsModule,
  MdCheckboxModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdFormFieldModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
} from '@angular/material';

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

    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdChipsModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdFormFieldModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
  ]
})
export class SharedModuleModule {
}
