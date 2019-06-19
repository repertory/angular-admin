import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntl as NewMatPaginatorIntl } from './mat-paginator-intl';

@NgModule({
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    },
    { provide: MatPaginatorIntl, useClass: NewMatPaginatorIntl },
  ]
})
export class MaterialModule { }
