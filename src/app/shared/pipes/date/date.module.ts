import {NgModule} from '@angular/core';

import {DatePipe} from './date.pipe';

@NgModule({
  declarations: [DatePipe],
  exports: [DatePipe]
})
export class DateModule {
}
