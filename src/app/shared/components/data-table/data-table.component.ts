import {Component, OnInit, Input} from '@angular/core';
import {SelectionModel} from '@angular/material';
import {DataTableService} from './data-table.service';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

    @Input() className: string;
    @Input() display: string[] = ['checkbox', 'objectId', 'createdAt', 'updatedAt'];
    @Input() pageSizeOptions: number[] = [5, 10, 20, 50, 100, 500, 1000];

    dataSource: DataTableService;
    selection = new SelectionModel(true, []);
    searchOpen = false;

    constructor(private dataTable: DataTableService) {
        this.dataSource = dataTable;
    }

    ngOnInit() {
        // this.dataTable.init({
        //     className: this.className
        // });
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

    // 分页显示
    paginationRange(): string {
        const start = this.dataSource.pagination.index;
        const dataLength = this.dataSource.data.length;
        const end = Math.min(start + this.dataSource.pagination.pageLength, dataLength);

        return `${start + 1} - ${end} of ${dataLength}`;
    }

    // 搜索关闭
    cancelSearch(input: HTMLInputElement, event: Event) {
        event.stopPropagation();

        this.searchOpen = false;

        input.value = '';
        input.blur();
    }

}
