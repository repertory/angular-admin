import {NgModule} from '@angular/core';

import {environment} from '../environments/environment';
import {ParseService} from './shared/shared.module';

@NgModule()
export class AppParseModule {
    constructor(private parse: ParseService) {
        parse.initialize(environment.parse);
    }
}
