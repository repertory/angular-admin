import {Component, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

import {DataTableOption} from '../data-table';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent {

    options: DataTableOption[];
    filters: any[] = [{}];
    where = {
        'String': [
            {
                name: '存在',
                key: 'exists',
            },
            {
                name: '不存在',
                key: 'doesNotExist',
            },
            {
                name: '等于',
                key: 'equalTo',
            },
            {
                name: '不等于',
                key: 'notEqualTo',
            },
            {
                name: '起始于',
                key: 'startsWith',
            },
            {
                name: '结束于',
                key: 'endsWith',
            },
        ]
    };

    constructor(@Inject(MD_DIALOG_DATA) public data: any) {
        this.options = data.options.filter(x => x.operate.query.enabled);
    }

    add() {
        this.filters.push({});
    }

    remove(index) {
        if (this.filters.length < 2) {
            return false;
        }
        this.filters.splice(index, 1);
    }

    getWhere(key): any[] {
        const option = this.options.filter(x => x.key === key).pop();
        console.log(option);
        if (!option || !option.type) {
            return [];
        }
        return this.where[option.type] || [];
    }
}
