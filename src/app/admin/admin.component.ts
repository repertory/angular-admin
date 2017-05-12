import {Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs/Rx';
import {MdSnackBar, MdSidenav} from '@angular/material';
import {TdDialogService} from '@covalent/core';

import {ParseService} from '../shared/shared.module';

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

    constructor(public parse: ParseService,
                private router: Router,
                private snackBar: MdSnackBar,
                private dialog: TdDialogService,
                private view: ViewContainerRef,
                private ER: ElementRef) {
    }

    @ViewChild(MdSidenav) sidenav: MdSidenav;

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
        this.dialog.openConfirm({
            message: '确定要退出吗？',
            disableClose: false,
            viewContainerRef: this.view,
            title: '系统提示',
            cancelButton: '取消',
            acceptButton: '确定',
        })
            .afterClosed()
            .subscribe((accept: boolean) => {
                if (accept) {
                    this.parse.logout().subscribe(
                        res => {
                            this.snackBar.open('已退出登录', '关闭', {duration: 2000});
                            this.ER.nativeElement.lastElementChild.click();
                            // this.router.navigate(['/login']);
                        }
                    );
                }
            });
    }

    profile() {
        this.dialog.openAlert({
            message: '功能完善中',
            disableClose: false,
            viewContainerRef: this.view,
            title: '个人资料',
            closeButton: '关闭',
        });
    }
}
