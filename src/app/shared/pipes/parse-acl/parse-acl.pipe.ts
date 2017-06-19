import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'parseAcl'
})
export class ParseAclPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value;
    }

}
