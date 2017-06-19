import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ParseService} from '../shared/shared.module';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

    constructor(private parse: ParseService, private router: Router) {
    }

    ngOnInit() {
        this.setup();
    }

    // 初始化
    setup() {
        const menu = [
            {group: '系统设置', name: '配置管理', link: '/admin/system/setting', icon: 'settings', orderBy: 1},
            {group: '系统设置', name: '菜单管理', link: '/admin/system/menu', icon: 'list', orderBy: 2},
            {group: '用户设置', name: '角色管理', link: '/admin/system/role', icon: 'group', orderBy: 3},
            {group: '用户设置', name: '用户管理', link: '/admin/system/user', icon: 'person', orderBy: 4},
        ];

        menu.forEach(data => {
            this.parse.create('Menu', data).subscribe();
        });

        this.router.navigateByUrl('/');
    }

}
