import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/zh-cn';

@Pipe({
  name: 'parseDate'
})
export class ParseDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // const type = typeof value === 'object' ? value.constructor.name : typeof value;
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  }

}
