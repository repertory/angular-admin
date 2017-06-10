import {Component, OnInit} from '@angular/core';
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

    constructor(public parse: ParseService) {
    }

    ngOnInit() {
        this.user = this.parse.userInfo();
    }

}
