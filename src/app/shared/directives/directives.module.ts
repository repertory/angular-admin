import {NgModule} from '@angular/core';

import {GalleryModule} from './gallery/gallery.module';

@NgModule({
    exports: [
        GalleryModule,
    ]
})
export class DirectivesModule {
}
