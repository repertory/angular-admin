import {Component, OnInit, OnDestroy, OnChanges, SimpleChanges, ElementRef, Input} from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-echarts',
    template: ' '
})
export class EchartsComponent implements OnInit, OnDestroy, OnChanges {

    @Input() option: object;
    @Input() width: Number | String = 'auto';
    @Input() height: Number | String = 'auto';
    @Input() theme: String = 'default';

    private chart: any;

    constructor(private element: ElementRef) {
        element.nativeElement.style.display = 'inline-block';
        this.chart = echarts.init(element.nativeElement, this.theme, {width: this.width, height: this.height});
    }

    ngOnInit() {
        this.setOption();
    }

    ngOnDestroy() {
        this.dispose();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('option' in changes) {
            this.setOption();
        }
        if ('width' in changes || 'height' in changes) {
            this.resize();
        }
    }

    setOption() {
        this.chart.setOption(this.option);
    }

    resize() {
        this.chart.resize({
            width: this.width,
            height: this.height,
        })
    }

    dispose() {
        this.chart.dispose();
    }
}
