import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ITdDataTableColumn, TdDialogService} from '@covalent/core';
import {ParseService} from '../../../shared/shared.module';
import * as moment from 'moment';
import 'moment/locale/zh-cn';

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
        orderName: 'updatedAt',
        orderBy: 'DESC',
    };
    data: any[] = [];

    columns: ITdDataTableColumn[] = [
        {name: 'objectId', label: 'ID'},
        {name: 'username', label: '用户名'},
        {name: 'createdAt', label: '注册时间', format: v => moment(v).format('YYYY-MM-DD HH:mm:ss')},
    ];

    constructor(public parse: ParseService, private dialog: TdDialogService, private view: ViewContainerRef) {
    }

    ngOnInit() {
        this.getData();
    }

    leaveConfirm(): Promise<boolean> {
        return this.dialog.openConfirm({
            message: '确定要离开用户管理页面吗？',
            disableClose: false,
            viewContainerRef: this.view,
            title: '离开提示',
            cancelButton: '否',
            acceptButton: '是',
        }).afterClosed().toPromise();
    }

    showFirstLast(): boolean {
        return !window.matchMedia(`(max-width: 400px)`).matches;
    }

    pageChange(event) {
        this.search.pageSize = event.pageSize;
        this.search.page = event.page;
        this.getData();
    }

    sortChange(event) {
        this.search.orderName = event.name;
        this.search.orderBy = event.order;
        this.getData();
    }

    rowSelect(event) {
        console.log('rowSelect', event);
    }

    selectAll(event) {
        console.log('selectAll', event);
    }

    getData() {
        this.parse.query('User', query => {
            query.count().then(res => this.search.total = res, err => this.search.total = 0);
            this.search.orderBy === 'ASC' ? query.ascending(this.search.orderName) : query.descending(this.search.orderName);
            query.skip((this.search.page - 1) * this.search.pageSize);
            query.limit(this.search.pageSize);
        }).subscribe(
            res => {
                this.data = res.result.map(x => x.toJSON());
            }
        );
    }

}
