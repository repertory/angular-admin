import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

import {DataTableOption} from '../data-table';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent {

    options: DataTableOption[];

    constructor(@Inject(MD_DIALOG_DATA) private data: any) {
        this.options = data.options.filter(x => x.operate.query.enabled);
    }

}
