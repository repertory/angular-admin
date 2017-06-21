import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'parseString'
})
export class ParseStringPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value || '';
    }

}
