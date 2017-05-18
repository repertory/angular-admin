import {NgModule} from '@angular/core';
import {FooterModule} from './footer/footer.module';
import {HeaderModule} from './header/header.module';
import {MarkdownModule} from './markdown/markdown.module';
import {QrcodeModule} from './qrcode/qrcode.module';

@NgModule({
    exports: [
        FooterModule,
        HeaderModule,
        MarkdownModule,
        QrcodeModule,
    ]
})
export class ComponentsModule {
}
