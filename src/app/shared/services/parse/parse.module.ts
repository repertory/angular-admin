import {NgModule} from '@angular/core';

import {ParseService} from './parse.service';
export * from './parse.service';

@NgModule({
  providers: [
    ParseService
  ]
})
export class ParseModule {
}
