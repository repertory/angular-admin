import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {ParseService} from '../shared/shared.module';

@Injectable()
export class AdminUserService {

    public data: any;

    constructor(private parse: ParseService, private router: Router, private snackBar: MdSnackBar) {
        this.data = parse.userInfo();
    }

    logout() {
        if (confirm('确定要退出吗？')) {
            this.parse.logout().subscribe(
                res => {
                    this.snackBar.open('已退出登录', '关闭', {duration: 2000});
                    this.router.navigate(['/login']);
                }
            );
        }
    }

    profile() {
        alert('功能完善中');
    }

}
