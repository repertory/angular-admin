import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {ParseService} from '../../services/services.module';

// init参数接口
export interface InputInterface {
    className: string;
}

@Injectable()
export class DataTableService {

    private input: InputInterface;  // 初始化传入参数
    private query: Observable<any>; // 数据对象

    public data: any[] = [];        // 当前数据列表

    // 分页配置
    pagination = new Proxy({page: 1, maxPage: 1, pageSize: 10, total: 0}, {
        get: (target, key, receiver) => {
            let value = 0;
            switch (key) {
                case 'maxPage':
                    value = Math.ceil(target.total / target.pageSize);
                    break;
                default:
                    value = Reflect.get(target, key, receiver);
            }
            return value;
        },
        set: (target, key, value, receiver) => {
            if (!Reflect.set(target, key, value, receiver)) {
                return false;
            }
            if (key === 'page') {
                this.setQuery();
            }
            return true;
        }
    });

    constructor(private parse: ParseService) {
        console.log('constructor');
    }

    init(input: InputInterface) {
        console.log('init');
        this.input = input;
        this.setQuery();
    }

    destroy() {
        console.log('destroy');
    }

    // 获取查询
    setQuery() {
        this.query = this.parse.query(this.input.className, query => {
            query.count().then(res => this.pagination.total = res, err => this.pagination.total = 0);
            query.skip((this.pagination.page - 1) * this.pagination.pageSize);
            query.limit(this.pagination.pageSize);
        });
    }

    // 获取数据列表
    connect(): Observable<any[]> {
        console.log('connect');
        return this.query.map(x => {
            this.data = x.result;
            return x.result;
        });
    }

    // 分页操作
    incrementPage(increment: number) {
        if (this.canIncrementPage(increment)) {
            this.pagination.page += increment;
        }
    }

    // 判断是否可以分页
    canIncrementPage(increment: number): boolean {
        const increasedPage = this.pagination.page + increment;
        return increasedPage >= 1 && increasedPage <= this.pagination.maxPage;
    }

    // 设置每页显示数
    setPageSize(pageSize: number) {
        this.pagination.pageSize = pageSize;
        this.pagination.page = 1;
    }

}
