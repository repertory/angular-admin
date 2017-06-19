import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'parseArray'
})
export class ParseArrayPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value;
    }

}
