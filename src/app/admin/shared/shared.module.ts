import {NgModule} from '@angular/core';

import {DialogModule} from './dialog/dialog.module';
export * from './dialog/dialog.module';

@NgModule({
    exports: [
        DialogModule
    ]
})
export class SharedModule {
}
