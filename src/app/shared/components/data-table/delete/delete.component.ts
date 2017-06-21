import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

    constructor(@Inject(MD_DIALOG_DATA) public data: any) {
        console.log(data.selection.selected);
    }

}
