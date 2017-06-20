import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

import {DataTableOption} from '../data-table';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent {

    options: DataTableOption[];

    constructor(@Inject(MD_DIALOG_DATA) private data: any) {
        this.options = data.options.filter(x => x.operate.create.enabled);
    }

}
