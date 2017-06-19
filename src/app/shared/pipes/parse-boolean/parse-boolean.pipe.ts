import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'parseBoolean'
})
export class ParseBooleanPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value;
    }

}
