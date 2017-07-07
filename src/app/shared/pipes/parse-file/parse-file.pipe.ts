import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'parseFile'
})
export class ParseFilePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const type = typeof value === 'object' ? value.constructor.name : typeof value;
    if (type !== 'ParseFile') {
      return null;
    }
    return `<a href="${value.url()}" target="_blank" title="${value.name()}">下载文件</a>`;
  }

}
