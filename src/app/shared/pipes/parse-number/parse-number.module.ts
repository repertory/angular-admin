import {NgModule} from '@angular/core';
import {ParseNumberPipe} from './parse-number.pipe';

@NgModule({
    declarations: [ParseNumberPipe],
    exports: [ParseNumberPipe],
})
export class ParseNumberModule {
}
