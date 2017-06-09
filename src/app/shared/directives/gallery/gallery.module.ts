import {NgModule} from '@angular/core';
import {GalleryDirective} from './gallery.directive';

@NgModule({
    declarations: [GalleryDirective],
    exports: [GalleryDirective],
})
export class GalleryModule {
}
