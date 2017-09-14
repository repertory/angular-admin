import {NgModule} from '@angular/core';

import {EchartsModule} from './echarts/echarts.module';
import {FooterModule} from './footer/footer.module';
import {HeaderModule} from './header/header.module';
import {QrcodeModule} from './qrcode/qrcode.module';

@NgModule({
  exports: [
    EchartsModule,
    FooterModule,
    HeaderModule,
    QrcodeModule,
  ],
})
export class ComponentsModule {
}
