import {Component, OnInit, OnDestroy, OnChanges, SimpleChanges, ElementRef, Input} from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-echarts',
    template: ' '
})
export class EchartsComponent implements OnInit, OnDestroy, OnChanges {

    @Input() option: object;
    @Input() theme: String = 'default';

    private chart: any;

    constructor(private element: ElementRef) {
        element.nativeElement.style.display = 'inline-block';
        this.chart = echarts.init(element.nativeElement, this.theme);
    }

    ngOnInit() {
        this.setOption();
    }

    ngOnDestroy() {
        this.chart.dispose();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('option' in changes) {
            this.setOption();
        }
    }

    setOption() {
        this.chart.setOption(this.option);
    }
}
