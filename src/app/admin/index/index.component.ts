import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ParseService, DataTable} from '../../shared/shared.module';

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

    public dataTable: DataTable = {
        className: 'Menu',
        name: '菜单管理',
        options: [
            {
                key: 'objectId',
                name: 'ID',
                type: 'String',
                operate: {
                    create: {
                        enabled: false,
                    },
                    update: {
                        enabled: false,
                    },
                    query: {
                        enabled: true,
                        orderBy: 1,
                    },
                }
            },
            {
                key: 'group',
                name: '分组',
                type: 'String',
                operate: {
                    create: {
                        enabled: true,
                    },
                    update: {
                        enabled: true,
                    },
                    query: {
                        enabled: true,
                        orderBy: 2,
                    },
                }
            },
            {
                key: 'name',
                name: '菜单',
                type: 'String',
                operate: {
                    create: {
                        enabled: true,
                    },
                    update: {
                        enabled: true,
                    },
                    query: {
                        enabled: true,
                        orderBy: 3,
                    },
                }
            },
            {
                key: 'link',
                name: '链接',
                type: 'String',
                operate: {
                    create: {
                        enabled: true,
                    },
                    update: {
                        enabled: true,
                    },
                    query: {
                        enabled: true,
                        orderBy: 4,
                    },
                }
            },
            {
                key: 'icon',
                name: '图标',
                type: 'String',
                operate: {
                    create: {
                        enabled: true,
                    },
                    update: {
                        enabled: true,
                    },
                    query: {
                        enabled: true,
                        orderBy: 5,
                    },
                }
            },
            {
                key: 'iconClass',
                name: '图标属性',
                type: 'String',
                operate: {
                    create: {
                        enabled: true,
                    },
                    update: {
                        enabled: true,
                    },
                    query: {
                        enabled: true,
                        orderBy: 6,
                    },
                }
            },
            {
                key: 'orderBy',
                name: '排序',
                type: 'Number',
                operate: {
                    create: {
                        enabled: true,
                    },
                    update: {
                        enabled: true,
                    },
                    query: {
                        enabled: true,
                        orderBy: 7,
                    },
                }
            },
            {
                key: 'createdAt',
                name: '创建时间',
                type: 'Date',
                operate: {
                    create: {
                        enabled: false,
                    },
                    update: {
                        enabled: false,
                    },
                    query: {
                        enabled: true,
                        orderBy: 9,
                    },
                }
            },
        ]
    };

    constructor(public parse: ParseService) {
    }

    ngOnInit() {
        this.user = this.parse.userInfo();
    }

}
