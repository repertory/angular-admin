import {NgModule} from '@angular/core';

import {GuardModule} from './guard/guard.module';
export * from './guard/guard.module';

import {ParseModule} from './parse/parse.module';
export * from './parse/parse.module';

@NgModule({
    imports: [
        GuardModule,
        ParseModule
    ]
})
export class ServicesModule {
}
