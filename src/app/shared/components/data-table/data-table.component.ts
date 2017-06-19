import {Component, OnInit, Input} from '@angular/core';

import {DataTableService} from './data-table.service';
import {DataTableOption} from './data-table';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

    @Input() className: string;
    @Input() options: DataTableOption[] = [];
    @Input() pageSizeOptions: number[] = [5, 10, 20, 50, 100, 500, 1000];

    constructor(public dataSource: DataTableService) {
    }

    ngOnInit() {
        this.dataSource.init({
            className: this.className
        });
    }

    // 获取需要显示的字段
    display() {
        const display = this.options
            .filter(x => x.operate.query.enabled)
            .sort((x, y) => x.operate.query.orderBy - y.operate.query.orderBy)
            .map(x => x.key);
        display.unshift('__checkbox__'); // 左侧单选框，避免与自定义字段冲突
        return display;
    }

}
