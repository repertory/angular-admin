import {NgModule} from '@angular/core';

import {EchartsModule} from './echarts/echarts.module';
import {FooterModule} from './footer/footer.module';
import {HeaderModule} from './header/header.module';
import {MarkdownModule} from './markdown/markdown.module';
import {QrcodeModule} from './qrcode/qrcode.module';

@NgModule({
    exports: [
        EchartsModule,
        FooterModule,
        HeaderModule,
        MarkdownModule,
        QrcodeModule,
    ]
})
export class ComponentsModule {
}
