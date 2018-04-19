import {NgModule} from '@angular/core';

import {ConfigModule} from '../config/config.module';

import {ParseService} from './parse.service';

@NgModule({
  imports: [ConfigModule],
  providers: [ParseService]
})
export class ParseModule {
}

export {ParseService} from './parse.service';
