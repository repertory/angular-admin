import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs/Rx';
import {MdSnackBar, MdDialog, MdSidenav} from '@angular/material';

import {ParseService} from '../shared/shared.module';
import {AdminDialogComponent} from './admin-dialog.component';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
    host: {
        '[class.dark-theme]': 'isDarkTheme',
    },
})
export class AdminComponent implements OnInit, OnDestroy {
    private subscriptions: Array<Subscription> = [];
    isDarkTheme = false;    // 夜间模式
    user: Observable<any>;   // 用户信息
    keyword: string;        // 菜单搜索

    menus: any[] = [
        {group: '系统设置', name: '配置管理', link: '/admin/system/setting', icon: 'settings'},
        {group: '系统设置', name: '菜单管理', link: '/admin/system/menu', icon: 'list'},
        {group: '用户设置', name: '角色管理', link: '/admin/system/role', icon: 'group'},
        {group: '用户设置', name: '用户管理', link: '/admin/system/user', icon: 'person'},
        {group: '关于系统', name: '代码托管', link: '/admin/about/code', icon: 'code'},
        {group: '关于系统', name: '使用帮助', link: '/admin/about/help', icon: 'help'},
    ];

    constructor(public parse: ParseService, private router: Router, private dialog: MdDialog, private snackBar: MdSnackBar) {
    }

    @ViewChild(MdSidenav) sidenav: MdSidenav;

    ngOnInit() {
        this.user = this.parse.userInfo();

        const sidenav = this.router.events.subscribe(() => {
            if (this.isScreenSmall()) {
                this.sidenav.close();
            }
        });
        this.subscriptions.push(sidenav);

        const checkLogin = this.user
            .filter(x => !x)
            .subscribe(x => this.gotoLogin());

        this.subscriptions.push(checkLogin);
    }

    ngOnDestroy() {
        for (const subs of this.subscriptions) {
            subs.unsubscribe();
        }
    }

    isScreenSmall(): boolean {
        return window.matchMedia(`(max-width: 768px)`).matches;
    }

    gotoLogin() {
        this.snackBar.open('请先登录', '关闭', {duration: 2000});
        this.router.navigate(['/login']);
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

    profile() {
        this.dialog.open(AdminDialogComponent);
    }
}
