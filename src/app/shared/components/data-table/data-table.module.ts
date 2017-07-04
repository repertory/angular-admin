import {NgModule} from '@angular/core';
import {SharedModuleModule} from '../../shared-module.module';
import {PipesModule} from '../../pipes/pipes.module';

import {DataTableService} from './data-table.service';
import {DataTableComponent} from './data-table.component';

import {CreateComponent} from './create/create.component';
import {DeleteComponent} from './delete/delete.component';
import {FilterComponent} from './filter/filter.component';
import {UpdateComponent} from './update/update.component';

export * from './data-table';

@NgModule({
  imports: [SharedModuleModule, PipesModule],
  providers: [DataTableService],
  declarations: [
    DataTableComponent,
    CreateComponent,
    DeleteComponent,
    FilterComponent,
    UpdateComponent,
  ],
  entryComponents: [
    CreateComponent,
    DeleteComponent,
    FilterComponent,
    UpdateComponent,
  ],
  exports: [DataTableComponent]
})
export class DataTableModule {
}
