import {NgModule} from '@angular/core';
import {GalleryDirective, GalleryItemDirective} from './gallery.directive';

@NgModule({
    declarations: [GalleryDirective, GalleryItemDirective],
    exports: [GalleryDirective, GalleryItemDirective],
})
export class GalleryModule {
}
