import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {ParseService} from '../shared/shared.module';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: string;
    password: string;

    constructor(public parse: ParseService, private router: Router, private snackBar: MdSnackBar) {
    }

    ngOnInit() {
        if (this.parse.User.current()) {
            this.goto();
        }
    }

    isScreenSmall(): boolean {
        return window.matchMedia(`(max-width: 736px)`).matches;
    }

    submit() {
        this.parse.login(this.username, this.password)
            .subscribe(
                res => {
                    this.snackBar.open('登录成功', '关闭', {duration: 2000});
                    this.goto();
                },
                err => this.snackBar.open(err.message || '登录失败', '关闭', {duration: 2000})
            );
        return false;
    }

    goto() {
        this.router.navigate(['/']);
    }
}
