import {NgModule} from '@angular/core';

import {DataTableModule} from './data-table/data-table.module';
import {EchartsModule} from './echarts/echarts.module';
import {FooterModule} from './footer/footer.module';
import {HeaderModule} from './header/header.module';
import {MarkdownModule} from './markdown/markdown.module';
import {QrcodeModule} from './qrcode/qrcode.module';

@NgModule({
    exports: [
        DataTableModule,
        EchartsModule,
        FooterModule,
        HeaderModule,
        MarkdownModule,
        QrcodeModule,
    ]
})
export class ComponentsModule {
}
