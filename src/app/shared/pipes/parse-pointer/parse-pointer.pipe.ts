import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'parsePointer'
})
export class ParsePointerPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value;
    }

}
