import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'parseNumber'
})
export class ParseNumberPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value;
    }

}
