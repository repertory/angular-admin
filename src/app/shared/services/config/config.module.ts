import {NgModule} from '@angular/core';

import {ConfigService} from './config.service';

@NgModule({
  providers: [ConfigService]
})
export class ConfigModule {
}

export {ConfigService} from './config.service';
