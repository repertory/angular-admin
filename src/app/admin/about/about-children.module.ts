import {NgModule} from '@angular/core';

import {CodeModule} from './code/code.module';
import {HelpModule} from './help/help.module';

@NgModule({
    imports: [
        CodeModule,
        HelpModule,
    ]
})
export class AboutChildrenModule {
}
