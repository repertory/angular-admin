import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ParseService} from '../../shared/shared.module';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
    user: Observable<any>;

    constructor(public parse: ParseService) {
    }

    ngOnInit() {
        this.user = this.parse.userInfo();
    }

}
