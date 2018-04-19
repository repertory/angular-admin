import {NgModule} from '@angular/core';

import {ConfigModule} from './config/config.module';
import {ParseModule} from './parse/parse.module';
import {ShowModule} from './show/show.module';

@NgModule({
  exports: [
    ConfigModule,
    ParseModule,
    ShowModule,
  ]
})
export class ServicesModule {
}

export {ConfigService} from './config/config.module';
export {ParseService} from './parse/parse.module';
export {ShowService} from './show/show.module';
