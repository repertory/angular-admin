import {Component, OnInit} from '@angular/core';
import {CollectionViewer, SelectionModel} from '@angular/material';
import {Observable} from 'rxjs/Rx';

import {ParseService} from '../../shared/shared.module';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    public user: Observable<any>;
    public qrcode: String = 'https://wangdong.io';
    public markdown: String = '# markdown \n :+1: | :-1: | :) | :( | :fa-github: \n ' +
        '![logo](http://upload.art.ifeng.com/2015/0811/1439261016228.jpg){width=100} \n[ ] 多选框 \n[x] 多选框';
    public echarts = {
        title: {text: 'ECharts 入门示例'},
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
    public gallery = [
        'http://upload.art.ifeng.com/2015/0811/1439261016228.jpg',
        'http://upload.art.ifeng.com/2015/0811/1439261016833.jpg',
        'http://upload.art.ifeng.com/2015/0811/1439261016273.jpg',
        'http://upload.art.ifeng.com/2015/0811/1439261016360.jpg',
        'http://upload.art.ifeng.com/2015/0811/1439261016443.jpg',
        'http://upload.art.ifeng.com/2015/0811/1439261016700.jpg',
        'http://upload.art.ifeng.com/2015/0811/1439261016241.jpg',
        'http://upload.art.ifeng.com/2015/0811/1439261016497.jpg'
    ];

    public data = [
        {
            id: '1',
            name: 'aaa',
            progress: Math.round(Math.random() * 100).toString(),
            color: 'red'
        },
        {
            id: '2',
            name: 'bbb',
            progress: Math.round(Math.random() * 100).toString(),
            color: 'blue'
        },
        {
            id: '3',
            name: 'ccc',
            progress: Math.round(Math.random() * 100).toString(),
            color: 'orange'
        }
    ];
    selection = new SelectionModel<any[]>(true, []);
    public dataSource = new test(this.data);
    public propertiesToDisplay: string[] = ['userId', 'userName', 'progress', 'color'];

    constructor(public parse: ParseService) {
    }

    ngOnInit() {
        this.user = this.parse.userInfo();
    }

    getOpacity(progress: number) {
        const distanceFromMiddle = Math.abs(50 - progress);
        return distanceFromMiddle / 50 + .3;
    }

    isAllSelected(): boolean {
        return !this.selection.isEmpty();
    }

}

class test {
    _renderedData: any[] = [];
    _peopleDatabase = {data: []};

    constructor(data) {
        this._peopleDatabase['data'] = data;
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return collectionViewer.viewChange.map((view: {start: number, end: number}) => {
            // Set the rendered rows length to the virtual page size. Fill in the data provided
            // from the index start until the end index or pagination size, whichever is smaller.
            this._renderedData.length = this._peopleDatabase.data.length;

            const buffer = 20;
            let rangeStart = Math.max(0, view.start - buffer);
            let rangeEnd = Math.min(this._peopleDatabase.data.length, view.end + buffer);

            for (let i = rangeStart; i < rangeEnd; i++) {
                this._renderedData[i] = this._peopleDatabase.data[i];
            }

            return this._renderedData;
        });
}
};
