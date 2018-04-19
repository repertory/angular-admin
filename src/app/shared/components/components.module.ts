import {NgModule} from '@angular/core';

import {EditorModule} from './editor/editor.module';
import {MarkdownModule} from './markdown/markdown.module';
import {QrcodeModule} from './qrcode/qrcode.module';

@NgModule({
  exports: [
    EditorModule,
    MarkdownModule,
    QrcodeModule
  ]
})
export class ComponentsModule {
}
