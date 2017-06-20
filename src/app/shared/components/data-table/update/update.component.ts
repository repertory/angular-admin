import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css']
})
export class UpdateComponent {

    constructor(@Inject(MD_DIALOG_DATA) public data: any) {
        console.log(data.selection.selected, data.options.filter(x => x.operate.update.enabled));
    }

}
