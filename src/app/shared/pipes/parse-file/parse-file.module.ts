import {NgModule} from '@angular/core';
import {ParseFilePipe} from './parse-file.pipe';

@NgModule({
  declarations: [ParseFilePipe],
  exports: [ParseFilePipe],
})
export class ParseFileModule {
}
