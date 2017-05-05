import {Component, OnInit} from '@angular/core';
import {ITdDataTableColumn} from '@covalent/core';
import {ParseService} from '../../../shared/shared.module';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    search = {
        total: 0,
        page: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50, 100],
    };
    data: any[] = [];

    columns: ITdDataTableColumn[] = [
        {name: 'objectId', label: 'ID'},
        {name: 'username', label: '用户名'},
        {name: 'createdAt', label: '注册时间'},
    ];

    constructor(public parse: ParseService) {
    }

    ngOnInit() {
        this.getData();
    }

    showFirstLast(): boolean {
        return !window.matchMedia(`(max-width: 400px)`).matches;
    }

    change(event) {
        this.search.pageSize = event.pageSize;
        this.search.page = event.page;
        this.getData();
    }

    getData() {
        this.parse.query('User', query => {
            query.count().then(res => this.search.total = res, err => this.search.total = 0);
            query.skip((this.search.page - 1) * this.search.pageSize);
            query.limit(this.search.pageSize);
        }).subscribe(
            res => {
                this.data = res.result.map(x => x.toJSON());
            }
        );
    }

}
