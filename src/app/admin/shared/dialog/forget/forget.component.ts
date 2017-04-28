import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

import {ParseService} from '../../../../shared/shared.module';
import {LoginDialog} from '../login/login.module';

@Component({
    selector: 'app-forget',
    templateUrl: './forget.component.html',
    styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

    constructor(public parse: ParseService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog,
                private dialogRef: MdDialogRef<ForgetComponent>) {
    }

    ngOnInit() {
    }

    forget(email) {
        this.parse.forget(email)
            .subscribe(
                x => {
                    this.dialogRef.close();
                    this.snackBar.open('邮件发送成功', '关闭', {duration: 2000});
                },
                err => this.snackBar.open(err.message || '邮件发送成功', '关闭', {duration: 2000})
            );
    }

    login() {
        this.dialogRef.close();
        this.dialog.open(LoginDialog, {disableClose: true});
    }
}
