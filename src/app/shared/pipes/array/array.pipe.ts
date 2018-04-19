import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'array'
})
export class ArrayPipe implements PipeTransform {

  transform(value: any, type?: string, option?: any) {
    if (!value || value.__proto__.constructor.name !== 'Array') {
      return value;
    }

    let result = [];
    switch (type) {
      case 'implode':
        result = value.join(option || ',');
        break;
      case 'pluck':
        result = value.map(x => x[option] || x.get(option));
        break;
      case 'unique':
        result = Array.from(new Set(value));
        break;
      case 'first':
        const first = value[0] || null;
        result = (option && first) ? (first[option] || first.get(option)) : first;
        break;
      case 'last':
        const last = value.length ? value[value.length - 1] : null;
        result = (option && last) ? (last[option] || last.get(option)) : last;
        break;
    }
    return result;
  }

}
