import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent {

    constructor(@Inject(MD_DIALOG_DATA) private data: any) {
        console.log(data.options.filter(x => x.operate.create.enabled));
    }

}
