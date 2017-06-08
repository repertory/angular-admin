import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {ParseService} from '../../shared/shared.module';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    user: Observable<any>;
    qrcode: String = 'https://wangdong.io';
    markdown: String = '# markdown \n :+1: | :-1: | :) | :( | :fa-github: \n ![logo](assets/svg/logo.svg){width=100} \n[ ] 多选框 \n[x] 多选框';
    echarts = {
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

    constructor(public parse: ParseService) {
    }

    ngOnInit() {
        this.user = this.parse.userInfo();
    }

}
