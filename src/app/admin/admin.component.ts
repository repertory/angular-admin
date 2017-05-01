import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {MdSnackBar} from '@angular/material';

import {ParseService} from '../shared/shared.module';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    host: {
        '[class.dark-theme]': 'isDarkTheme',
    },
})
export class AdminComponent implements OnInit {
    isDarkTheme = false;    // 夜间模式
    user: Observable<any>;  // 用户信息
    keyword: string;        // 菜单搜索

    menus: any[] = [
        {group: '系统设置', name: '配置管理', link: '#', icon: 'settings'},
        {group: '系统设置', name: '菜单管理', link: '#', icon: 'list'},
        {group: '用户设置', name: '角色管理', link: '#', icon: 'group'},
        {group: '用户设置', name: '用户管理', link: '#', icon: 'person'},
        {group: '关于系统', name: '代码托管', link: '#', icon: 'code'},
        {group: '关于系统', name: '使用帮助', link: '#', icon: 'help'},
    ];

    constructor(public parse: ParseService, private router: Router, private snackBar: MdSnackBar) {
    }

    ngOnInit() {
        this.user = this.parse.userInfo();

        this.parse.userInfo()
            .filter(x => !x)
            .subscribe(x => this.gotoLogin());
    }

    isScreenSmall(): boolean {
        return window.matchMedia(`(max-width: 768px)`).matches;
    }

    gotoLogin() {
        this.snackBar.open('请先登录', '关闭', {duration: 2000});
        this.router.navigateByUrl('/login');
    }

    getMenus() {
        const result = {groups: [], tree: {}};
        for (const menu of this.menus.filter(m => JSON.stringify(m).includes(this.keyword || ''))) {
            if (!result.tree[menu.group]) {
                result.tree[menu.group] = [];
                result.groups.push(menu.group);
            }
            result.tree[menu.group].push(menu);
        }
        return result;
    }
}
