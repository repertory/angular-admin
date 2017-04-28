import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MdDialog} from '@angular/material';

import {ParseService} from '../shared/shared.module';
import {LoginDialog} from './shared/shared.module';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    host: {
        '[class.dark-theme]': 'isDarkTheme',
    },
})
export class AdminComponent implements OnInit {
    isDarkTheme = false;
    user: Observable<any>;
    loginDialog = false;

    constructor(public parse: ParseService, public dialog: MdDialog) {
    }

    ngOnInit() {
        this.user = this.parse.userInfo();

        this.parse.userInfo()
            .filter(x => !x)
            .subscribe(x => this.login());
    }

    isScreenSmall(): boolean {
        return window.matchMedia(`(max-width: 768px)`).matches;
    }

    login() {
        if (this.loginDialog) {
            return false;
        }

        this.loginDialog = true;
        this.dialog.open(LoginDialog, {disableClose: false})
            .afterClosed()
            .subscribe(x => this.loginDialog = false);
    }
}
