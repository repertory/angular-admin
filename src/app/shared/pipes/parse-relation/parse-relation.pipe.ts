import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'parseRelation'
})
export class ParseRelationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
