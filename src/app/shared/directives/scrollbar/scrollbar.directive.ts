import {Directive, ElementRef, OnDestroy, DoCheck} from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Directive({
  selector: '[appScrollbar]'
})
export class ScrollbarDirective implements OnDestroy, DoCheck {

  private ps;

  constructor(private el: ElementRef) {
    this.ps = new PerfectScrollbar(el.nativeElement);
  }

  ngDoCheck() {
    this.ps.update();
  }

  ngOnDestroy() {
    this.ps.destroy();
  }

}
