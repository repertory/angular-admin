import {Component, OnDestroy, AfterViewInit, Input, ViewChild, ElementRef, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import * as SimpleMDE from 'simplemde';

import {ParseService, ShowService} from '~shared/services/services.module';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditorComponent),
    multi: true
  }],
})
export class EditorComponent implements ControlValueAccessor, OnDestroy, AfterViewInit {

  private simplemde: SimpleMDE | null = null;
  private change: any;
  private value = '';

  @ViewChild('editor') editor: ElementRef;
  @ViewChild('input') input: ElementRef;

  @Input() placeholder = '';
  @Input() autofocus = false;
  @Input() multiple = false;
  @Input() accept = '*';
  @Input() options: object = {};

  constructor(public parse: ParseService, public show: ShowService) {
  }

  ngAfterViewInit() {
    const config = {
      component: this,
      element: this.editor.nativeElement,
      placeholder: this.placeholder,
      autofocus: !!this.autofocus,
      shortcuts: {
        toggleFullScreen: null,
        toggleSideBySide: null
      },
      toolbar: [
        'heading', 'bold', 'italic', 'strikethrough', '|',
        'unordered-list', 'ordered-list', '|',
        'quote', 'table', 'horizontal-rule', '|',
        'link', 'image', {
          name: 'upload',
          action: this.upload,
          className: 'fa fa-upload',
          title: '上传',
        }, '|', 'preview', 'side-by-side', 'fullscreen'
      ],
      status: false,
      indentWithTabs: false,
      tabSize: 2,
      styleSelectedText: false,
    };
    this.simplemde = new SimpleMDE(Object.assign({}, config, this.options));

    if (this.value) {
      this.simplemde.value(this.value);
    }

    this.simplemde.codemirror.on('change', () => {
      this.value = this.simplemde.value();

      if (this.change) {
        this.change(this.value);
      }
    });

  }

  ngOnDestroy() {
    this.simplemde.toTextArea();
    this.simplemde = null;
  }

  writeValue(value) {
    this.value = typeof value === 'string' ? value : '';
    if (this.simplemde) {
      this.simplemde.value(this.value);
    }
  }

  registerOnChange(fn) {
    this.change = fn;
  }

  registerOnTouched(val) {
    //
  }

  upload(editor) {
    const self = editor.options.component;
    const input = self.input.nativeElement;
    input.click();
    input.onchange = function (event) {
      // 上传取消
      if (!event.target.files.length) {
        return self.show.info('已取消上传');
      }

      // 批量上传
      const files: File[] = Array.from(event.target.files);
      self.show.info(`正在上传${files.length}个文件`);
      files.forEach((file: File) => {
        const name = new Date().getTime() + '.' + file.name.split('.').pop().toLowerCase();

        new self.parse.File(name, file).save()
          .then(data => {
            const insert = file.type.toLowerCase().startsWith('image') ?
              `![${file.name}](${data.url()})` :
              `[${file.name}](${data.url()})`;

            self.show.success(`文件 ${file.name} 上传成功`);
            editor.value(self.value ? (self.value + '\n' + insert) : insert);
          })
          .catch(() => self.show.success(`文件 ${file.name} 上传失败`));
      });
      input.value = null;
    };
  }

}
