import {Injectable} from '@angular/core';
import * as moment from 'moment';

import {CONFIG} from '~script/config.simple';

moment.locale('zh-cn');

@Injectable()
export class ConfigService {

  version = CONFIG.package.version;
  author = CONFIG.package.author;
  name = CONFIG.app.appName;
  domain = CONFIG.server.domain;
  copyright = `2017 - ${moment().year()} ${CONFIG.app.appName}`;
  parse = CONFIG.app;

}
