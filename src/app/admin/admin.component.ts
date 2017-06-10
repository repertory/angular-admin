import {Component, HostBinding, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs/Rx';
import {MdSnackBar, MdSidenav, OverlayContainer} from '@angular/material';

import {ParseService} from '../shared/shared.module';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {

    @HostBinding('class.dark-theme') isDarkTheme = false;
    @ViewChild(MdSidenav) sidenav: MdSidenav;

    private subscriptions: Array<Subscription> = [];

    public user: Observable<any>;   // 用户信息
    public keyword: string;         // 菜单搜索

    menus: any[] = [
        {group: '系统设置', name: '配置管理', link: '/admin/system/setting', icon: 'settings'},
        {group: '系统设置', name: '菜单管理', link: '/admin/system/menu', icon: 'list'},
        {group: '用户设置', name: '角色管理', link: '/admin/system/role', icon: 'group'},
        {group: '用户设置', name: '用户管理', link: '/admin/system/user', icon: 'person'},
        {group: '关于系统', name: '代码托管', link: '/admin/about/code', icon: 'code'},
        {group: '关于系统', name: '使用帮助', link: '/admin/about/help', icon: 'help'},
    ];

    constructor(public parse: ParseService,
                private overlayContainer: OverlayContainer,
                private router: Router,
                private snackBar: MdSnackBar) {
    }

    ngOnInit() {
        this.user = this.parse.userInfo();

        // 菜单收缩
        const sidenav = this.router.events.subscribe(() => {
            if (this.isScreenSmall()) {
                this.sidenav.close();
            }
        });
        this.subscriptions.push(sidenav);
    }

    ngOnDestroy() {
        for (const subs of this.subscriptions) {
            subs.unsubscribe();
        }
    }

    isScreenSmall(): boolean {
        return window.matchMedia(`(max-width: 768px)`).matches;
    }

    changeTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        this.overlayContainer.themeClass = this.isDarkTheme ? 'dark-theme' : 'light-theme';
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
