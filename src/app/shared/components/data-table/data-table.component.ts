import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {SelectionModel} from '@angular/material';
import {DataTableService} from './data-table.service';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnDestroy {

    @Input() className: string;
    @Input() options: any[] = [];
    @Input() pageSizeOptions: number[] = [5, 10, 20, 50, 100, 500, 1000];

    dataSource: DataTableService;
    selection = new SelectionModel(true, []);

    constructor(private dataTable: DataTableService) {
        this.dataSource = dataTable;
    }

    ngOnInit() {
        this.dataSource.init({
            className: this.className
        });
    }

    ngOnDestroy() {
        this.dataSource.destroy();
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

    // 是否为全选状态
    isAllSelected(): boolean {
        return !this.selection.isEmpty() && this.selection.selected.length === this.dataSource.data.length;
    }

    // 全选或取消
    selectAllToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
        } else {
            this.dataSource.data.forEach(data => this.selection.select(data));
        }
    }

}
