import {NgModule} from '@angular/core';

import {GuardService} from './guard.service';
export * from './guard.service';

@NgModule({
    providers: [
        GuardService
    ]
})
export class GuardModule {
}
