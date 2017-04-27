import {NgModule} from '@angular/core';

import {ParseModule} from './parse/parse.module';
export * from './parse/parse.module';

@NgModule({
    imports: [
        ParseModule
    ]
})
export class ServicesModule {
}
