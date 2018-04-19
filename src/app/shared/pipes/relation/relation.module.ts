import {NgModule} from '@angular/core';

import {RelationPipe} from './relation.pipe';

@NgModule({
  declarations: [RelationPipe],
  exports: [RelationPipe]
})
export class RelationModule {
}
