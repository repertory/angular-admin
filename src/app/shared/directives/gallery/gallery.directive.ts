import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[appGallery]'
})
export class GalleryDirective {

    @HostListener('mouseenter') onMouseEnter() {
        window['lightGallery'](this.element.nativeElement, {
            selector: '[appGalleryItem]',
            cssEasing: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)'
        });
    }

    constructor(private element: ElementRef) {
    }
}

@Directive({
    selector: '[appGalleryItem]'
})
export class GalleryItemDirective {
}
