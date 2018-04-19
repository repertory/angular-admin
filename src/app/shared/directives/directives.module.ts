import {NgModule} from '@angular/core';

import {GalleryModule} from './gallery/gallery.module';
import {ScrollbarModule} from './scrollbar/scrollbar.module';

@NgModule({
  exports: [
    GalleryModule,
    ScrollbarModule
  ]
})
export class DirectivesModule {
}
