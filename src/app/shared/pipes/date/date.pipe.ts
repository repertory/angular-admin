import {Pipe, PipeTransform} from '@angular/core';

import * as moment from 'moment';

moment.locale('zh-cn');

@Pipe({
  name: 'date',
  pure: true
})
export class DatePipe implements PipeTransform {

  transform(value: number | string | Date, format?: string): any {
    if (value && format === 'fromNow') {
      return moment(value).fromNow();
    }
    return value ? moment(value).format(format || 'YYYY-MM-DD HH:mm') : null;
  }

}
