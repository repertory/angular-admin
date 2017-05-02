import {NgModule} from '@angular/core';

import {AboutModule} from './about/about.module';
import {IndexModule} from './index/index.module';
import {SystemModule} from './system/system.module';

@NgModule({
    imports: [
        AboutModule,
        IndexModule,
        SystemModule,
    ]
})
export class AdminChildrenModule {
}
