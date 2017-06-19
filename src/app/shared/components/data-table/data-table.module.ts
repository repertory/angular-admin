import {NgModule} from '@angular/core';
import {SharedModuleModule} from '../../shared-module.module';
import {PipesModule} from '../../pipes/pipes.module';

import {DataTableService} from './data-table.service';
import {DataTableComponent} from './data-table.component';

export * from './data-table';

@NgModule({
    imports: [SharedModuleModule, PipesModule],
    providers: [DataTableService],
    declarations: [DataTableComponent],
    exports: [DataTableComponent]
})
export class DataTableModule {
}
