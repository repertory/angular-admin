import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

import {ParseService} from '../../../../shared/shared.module';
import {RegisterDialog} from '../register/register.module';
import {ForgetDialog} from '../forget/forget.module';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(public parse: ParseService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog,
                private dialogRef: MdDialogRef<LoginComponent>) {
    }

    ngOnInit() {
    }

    login(username, password) {
        this.parse.login(username, password)
            .subscribe(
                x => {
                    this.dialogRef.close();
                    this.snackBar.open('登录成功', '关闭', {duration: 2000});
                },
                err => this.snackBar.open(err.message || '登录失败', '关闭', {duration: 2000})
            );
    }

    register() {
        this.dialogRef.close();
        this.dialog.open(RegisterDialog, {disableClose: false});
    }

    forget() {
        this.dialogRef.close();
        this.dialog.open(ForgetDialog, {disableClose: false});
    }

}
