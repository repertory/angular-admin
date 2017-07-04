import {NgModule} from '@angular/core';

import {ParseAclModule} from './parse-acl/parse-acl.module';
import {ParseArrayModule} from './parse-array/parse-array.module';
import {ParseBooleanModule} from './parse-boolean/parse-boolean.module';
import {ParseDateModule} from './parse-date/parse-date.module';
import {ParseFileModule} from './parse-file/parse-file.module';
import {ParseNumberModule} from './parse-number/parse-number.module';
import {ParseObjectModule} from './parse-object/parse-object.module';
import {ParsePointerModule} from './parse-pointer/parse-pointer.module';
import {ParseRelationModule} from './parse-relation/parse-relation.module';
import {ParseStringModule} from './parse-string/parse-string.module';

@NgModule({
  exports: [
    ParseAclModule,
    ParseArrayModule,
    ParseBooleanModule,
    ParseDateModule,
    ParseFileModule,
    ParseNumberModule,
    ParseObjectModule,
    ParsePointerModule,
    ParseRelationModule,
    ParseStringModule,
  ],
})
export class PipesModule {
}
