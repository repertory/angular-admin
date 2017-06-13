import {NgModule} from '@angular/core';
import {SharedModuleModule} from '../../shared-module.module';

import {DataTableService} from './data-table.service';
import {DataTableComponent} from './data-table.component';

@NgModule({
    imports: [SharedModuleModule],
    providers: [DataTableService],
    declarations: [DataTableComponent],
    exports: [DataTableComponent]
})
export class DataTableModule {
}
