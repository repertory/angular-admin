import {Pipe, PipeTransform} from '@angular/core';
import {Parse} from 'parse';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any, parentClass: string | object, relationKey: string, type?: string, option?: any): Promise<any> {
    const query = new Parse.Query(parentClass);
    query.equalTo(relationKey, value);

    switch (type) {
      case 'ascending':
        query.addAscending(option || 'createdAt');
        break;
      case 'descending':
        query.addDescending(option || 'createdAt');
        break;
      case 'limit':
        query.limit(option);
        break;
      case 'skip':
        query.skip(option);
        break;
    }
    return type === 'count' ? query.count() : query.find();
  }

}
