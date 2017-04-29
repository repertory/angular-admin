import {Component, OnInit} from '@angular/core';
import {MdSnackBar} from '@angular/material';
import {ParseService} from '../shared/shared.module';

@Component({
    selector: 'app-forget',
    templateUrl: './forget.component.html',
    styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
    email: string;

    constructor(public parse: ParseService, private snackBar: MdSnackBar) {
    }

    ngOnInit() {
    }

    isScreenSmall(): boolean {
        return window.matchMedia(`(max-width: 736px)`).matches;
    }

    submit() {
        this.parse.forget(this.email)
            .subscribe(
                res => this.snackBar.open('邮件发送成功', '关闭', {duration: 2000}),
                err => this.snackBar.open(err.message || '邮件发送失败', '关闭', {duration: 2000})
            );
    }

}
