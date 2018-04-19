import {NgModule} from '@angular/core';

import {ArrayModule} from './array/array.module';
import {DateModule} from './date/date.module';
import {GetModule} from './get/get.module';
import {PointerModule} from './pointer/pointer.module';
import {RelationModule} from './relation/relation.module';
import {ReverseModule} from './reverse/reverse.module';

@NgModule({
  exports: [
    ArrayModule,
    DateModule,
    GetModule,
    PointerModule,
    RelationModule,
    ReverseModule
  ]
})
export class PipesModule {
}
