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

    dataSource: DataTableService;
    selection = new SelectionModel(true, []);

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

}
