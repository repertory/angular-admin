import {Directive, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
  selector: '[appGallery]'
})
export class GalleryDirective implements AfterViewInit {

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window['lightGallery'](this.element.nativeElement, {selector: '[appGalleryItem]'});
    }, 150);
  }

}

@Directive({
  selector: '[appGalleryItem]'
})
export class GalleryItemDirective {
}
