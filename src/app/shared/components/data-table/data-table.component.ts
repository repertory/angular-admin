import {Component, OnInit, Input} from '@angular/core';
import {DataTableService} from './data-table.service';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

    @Input() className: string;
    @Input() display: string[] = ['objectId', 'createdAt', 'updatedAt'];

    dataSource: DataTableService;

    constructor(private dataTable: DataTableService) {
        this.dataSource = dataTable;
    }

    ngOnInit() {
        this.dataTable.init({
            className: this.className
        });
    }

}
