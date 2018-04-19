import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pointer'
})
export class PointerPipe implements PipeTransform {

  transform(value: any, key?: string): any {
    let data = value;
    if (key) {
      if (!data || !data.has(key)) {
        return Promise.resolve(data);
      }
      data = value.get(key);
    }
    if (!data || data.has('createdAt')) {
      return Promise.resolve(data);
    }

    return data.fetch();
  }

}
