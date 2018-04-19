import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'get'
})
export class GetPipe implements PipeTransform {

  transform(value: any, key?: string): any {
    if (!value || !value.has(key)) {
      return null;
    }
    if (!key) {
      return value;
    }
    return value.get(key);
  }

}
