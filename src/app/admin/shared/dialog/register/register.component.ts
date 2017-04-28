import {Component, OnInit} from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

import {ParseService} from '../../../../shared/shared.module';
import {LoginDialog} from '../login/login.module';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(public parse: ParseService,
                private snackBar: MdSnackBar,
                private dialog: MdDialog,
                private dialogRef: MdDialogRef<RegisterComponent>) {
    }

    ngOnInit() {
    }

    register(username, password, attributes) {
        this.parse.register(username, password, attributes)
            .subscribe(
                x => {
                    this.dialogRef.close();
                    this.snackBar.open('注册成功', '关闭', {duration: 2000});
                },
                err => this.snackBar.open(err.message || '注册失败', '关闭', {duration: 2000})
            );
    }

    login() {
        this.dialogRef.close();
        this.dialog.open(LoginDialog, {disableClose: false});
    }

}
