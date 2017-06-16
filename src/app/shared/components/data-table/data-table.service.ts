import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ParseService} from '../../services/services.module';

// init参数接口
export interface InputInterface {
    className: string;
}

@Injectable()
export class DataTableService {

    private input: InputInterface;  // 初始化传入参数
    private query: BehaviorSubject<any[]> = new BehaviorSubject([]);

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
    }

    init(input: InputInterface) {
        this.input = input;
        this.setQuery();
    }

    // 更新数据
    setQuery() {
        this.parse.query(
            this.input.className,
            query => {
                query.count().then(res => this.pagination.total = res, err => this.pagination.total = 0);
                query.skip((this.pagination.page - 1) * this.pagination.pageSize);
                query.limit(this.pagination.pageSize);
            }
        )
            .map(x => x.result)
            .subscribe(res => {
                this.data = res;
                this.query.next(res);
            });
    }

    // 数据列表
    connect(): Observable<any[]> {
        return this.query.asObservable();
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
