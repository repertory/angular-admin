import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

import {ParseService} from '../shared/shared.module';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    user: Observable<any>;

    constructor(public parse: ParseService, public dialog: MdDialog) {
    }

    ngOnInit() {
        this.user = this.parse.userInfo();
    }

    isScreenSmall(): boolean {
        return window.matchMedia(`(max-width: 768px)`).matches;
    }

    login() {
        this.dialog.open(AdminLoginComponent);
    }

    register() {
        this.dialog.open(AdminRegisterComponent);
    }
}

@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
})
export class AdminLoginComponent {
    constructor(public parse: ParseService, public dialog: MdDialog, public dialogRef: MdDialogRef<AdminLoginComponent>, public snackBar: MdSnackBar) {
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
        this.dialog.open(AdminRegisterComponent);
    }

    forget() {
        this.dialogRef.close();
        this.dialog.open(AdminForgetComponent);
    }
}

@Component({
    selector: 'app-admin-register',
    templateUrl: './admin-register.component.html',
})
export class AdminRegisterComponent {
    constructor(public parse: ParseService, public dialogRef: MdDialogRef<AdminRegisterComponent>, public snackBar: MdSnackBar) {
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
}

@Component({
    selector: 'app-admin-forget',
    templateUrl: './admin-forget.component.html',
})
export class AdminForgetComponent {
    constructor(public parse: ParseService, public dialogRef: MdDialogRef<AdminForgetComponent>, public snackBar: MdSnackBar) {
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
}
