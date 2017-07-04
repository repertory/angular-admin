import {Component, OnInit, OnChanges, SimpleChanges, ElementRef, Input} from '@angular/core';
import * as QRious from 'qrious';

@Component({
  selector: 'app-qrcode',
  template: ' ',
})
export class QrcodeComponent implements OnInit, OnChanges {

  @Input() background: String = 'white';
  @Input() backgroundAlpha: Number = 1.0;
  @Input() foreground: String = 'black';
  @Input() foregroundAlpha: Number = 1.0;
  @Input() level: String = 'L';
  @Input() mime: String = 'image/png';
  @Input() padding: Number = null;
  @Input() size: Number = 100;
  @Input() value: String = '';

  @Input() canvas: Boolean = false;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.generate();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      'background' in changes ||
      'backgroundAlpha' in changes ||
      'foreground' in changes ||
      'foregroundAlpha' in changes ||
      'level' in changes ||
      'mime' in changes ||
      'padding' in changes ||
      'size' in changes ||
      'value' in changes ||
      'canvas' in changes
    ) {
      this.generate();
    }
  }

  generate() {
    const el: HTMLElement = this.element.nativeElement;
    el.innerHTML = '';

    const qrcode = new QRious({
      background: this.background,
      backgroundAlpha: this.backgroundAlpha,
      foreground: this.foreground,
      foregroundAlpha: this.foregroundAlpha,
      level: this.level,
      mime: this.mime,
      padding: this.padding,
      size: this.size,
      value: this.utf16to8(this.value)
    });

    if (this.canvas) {
      el.appendChild(qrcode.canvas);
    } else {
      el.appendChild(qrcode.image);
    }
  }

  // 处理中文问题
  utf16to8(str) {
    const len = str.length;
    let out = '';

    for (let i = 0; i < len; i++) {
      const c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
      } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      } else {
        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      }
    }
    return out;
  }

}
