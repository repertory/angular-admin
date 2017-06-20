import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

import {DataTableOption} from '../data-table';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css']
})
export class UpdateComponent {

    options: DataTableOption[];

    constructor(@Inject(MD_DIALOG_DATA) public data: any) {
        this.options = data.options.filter(x => x.operate.update.enabled);

        console.log(data.selection.selected);
    }

}
