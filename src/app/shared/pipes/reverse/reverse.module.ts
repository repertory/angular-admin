import {NgModule} from '@angular/core';

import {ReversePipe} from './reverse.pipe';

@NgModule({
  declarations: [ReversePipe],
  exports: [ReversePipe]
})
export class ReverseModule {
}
