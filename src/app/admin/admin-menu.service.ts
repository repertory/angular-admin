import {Injectable} from '@angular/core';
import {ParseService} from '../shared/shared.module';

export interface Menu {
    group: string;
    name: string;
    link: string;
    icon?: string;
    iconClass?: string;
}

@Injectable()
export class AdminMenuService {

    public data: Menu[] = [
        {group: '系统设置', name: '配置管理', link: '/admin/system/setting', icon: 'settings'},
        {group: '系统设置', name: '菜单管理', link: '/admin/system/menu', icon: 'list'},
        {group: '用户设置', name: '角色管理', link: '/admin/system/role', icon: 'group'},
        {group: '用户设置', name: '用户管理', link: '/admin/system/user', icon: 'person'},
        {group: '关于系统', name: '代码托管', link: '/admin/about/code', icon: 'code'},
        {group: '关于系统', name: '使用帮助', link: '/admin/about/help', icon: 'help'},
    ];
    public keyword: string;  // 搜索关键字

    constructor(private parse: ParseService) {
        this.setData();
    }

    // 更新数据
    setData() {
        this.parse.query('Menu',
            query => {
                query.limit(1000);
            }
        )
            .filter(x => x.type && x.type === 'result')
            .map(x => x.result)
            .map(x => x.toJSON())
            .subscribe(res => {
                this.data = res;
            });
    }

    // 获取数据
    getData() {
        const result = {groups: [], tree: {}};
        for (const menu of this.data.filter(m => JSON.stringify(m).includes(this.keyword || ''))) {
            if (!result.tree[menu.group]) {
                result.tree[menu.group] = [];
                result.groups.push(menu.group);
            }
            result.tree[menu.group].push(menu);
        }
        return result;
    }

}
