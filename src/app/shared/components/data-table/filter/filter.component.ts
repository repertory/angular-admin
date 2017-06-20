import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent {

    constructor(@Inject(MD_DIALOG_DATA) private data: any) {
        console.log(data.options.filter(x => x.operate.query.enabled));
    }

}
