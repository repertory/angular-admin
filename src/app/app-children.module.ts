import {NgModule} from '@angular/core';

import {HomeModule} from './home/home.module';
import {AdminModule} from './admin/admin.module';

@NgModule({
    imports: [
        HomeModule,
        AdminModule
    ]
})
export class AppChildrenModule {
}
