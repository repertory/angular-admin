import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'parseObject'
})
export class ParseObjectPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value;
    }

}
