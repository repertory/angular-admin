import {NgModule} from '@angular/core';
import {ParseBooleanPipe} from './parse-boolean.pipe';

@NgModule({
    declarations: [ParseBooleanPipe],
    exports: [ParseBooleanPipe],
})
export class ParseBooleanModule {
}
