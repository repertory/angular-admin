import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'relation'
})
export class RelationPipe implements PipeTransform {

  transform(value: any, type?: string, option?: any): Promise<any> {
    const query = value.query();
    let result = null;
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
      case 'count':
        result = query.count();
        break;
      case 'exist':
        result = query.get(option.id);
        break;
    }
    return result || query.find();
  }

}
