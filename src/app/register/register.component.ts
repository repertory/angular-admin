import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {ParseService} from '../shared/shared.module';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    username: string;
    password: string;
    email: string;

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
        this.parse.register(this.username, this.password, {email: this.email})
            .subscribe(
                res => {
                    this.snackBar.open('用户注册成功', '关闭', {duration: 2000});
                    this.goto();
                },
                err => this.snackBar.open(err.message || '用户注册失败', '关闭', {duration: 2000})
            );
        return false;
    }

    goto() {
        this.router.navigateByUrl('/admin');
    }

}
