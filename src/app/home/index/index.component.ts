import {Component, OnInit} from '@angular/core';

import {ParseService} from '../../shared/shared.module';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
    constructor(public parse: ParseService) {
    }

    ngOnInit() {
    }
}
