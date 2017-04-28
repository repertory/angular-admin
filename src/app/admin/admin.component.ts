import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MdDialog} from '@angular/material';

import {ParseService} from '../shared/shared.module';
import {LoginDialog} from './shared/shared.module';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    user: Observable<any>;
    loginDialog = false;

    constructor(public parse: ParseService, public dialog: MdDialog) {
    }

    ngOnInit() {
        this.user = this.parse.userInfo();
    }

    isScreenSmall(): boolean {
        return window.matchMedia(`(max-width: 768px)`).matches;
    }

    login() {
        this.dialog.open(LoginDialog)
            .afterClosed()
            .subscribe(x => this.loginDialog = false);
    }
}
