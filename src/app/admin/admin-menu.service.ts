import {Injectable} from '@angular/core';
import {ParseService} from '../shared/shared.module';

export interface Menu {
    group: string;
    name: string;
    link: string;
    icon?: string;
    iconClass?: string;
    orderBy?: number;
}

@Injectable()
export class AdminMenuService {

    public keyword: string;  // 搜索关键字
    public data: Menu[] = [];  // 菜单数据

    constructor(private parse: ParseService) {
        this.setData();
    }

    // 更新数据
    setData() {
        this.parse.query('Menu',
            query => {
                query.ascending('orderBy');
                query.limit(1000);
            }
        )
            .filter(x => x.type && x.type === 'result')
            .map(x => x.result)
            .subscribe(res => {
                this.data = res.map(x => x.toJSON());
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
