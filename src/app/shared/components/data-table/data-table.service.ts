import {Injectable} from '@angular/core';
import {CollectionViewer} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ParseService} from '../../services/services.module';

// init参数接口
export interface InputInterface {
    className: string;
}

@Injectable()
export class DataTableService {

    public data: any[] = [];
    public query: Observable<any>;

    private input: InputInterface;

    constructor(private parse: ParseService) {
        console.log('constructor');
    }

    init(input: InputInterface) {
        console.log('init');
        this.input = input;
        this.query = this.parse.query(this.input.className);
    }

    destroy() {
        console.log('destroy');
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        console.log('connect');
        return this.query.map(x => {
            this.data = x.result;
            return x.result;
        });
        // return collectionViewer.viewChange
        //     .map((view: { start: number, end: number }) => {
        //         // Set the rendered rows length to the virtual page size. Fill in the data provided
        //         // from the index start until the end index or pagination size, whichever is smaller.
        //         this.renderedData.length = this.data.length;
        //
        //         const buffer = 20;
        //         const rangeStart = Math.max(0, view.start - buffer);
        //         const rangeEnd = Math.min(this.data.length, view.end + buffer);
        //
        //         for (let i = rangeStart; i < rangeEnd; i++) {
        //             this.renderedData[i] = this.data[i];
        //         }
        //
        //         return this.renderedData;
        //     });
    }

    private _pagination = new BehaviorSubject({index: 0, pageLength: 10});
    set pagination(pagination) {
        this._pagination.next(pagination);
    };

    get pagination() {
        return this._pagination.value;
    }

    incrementPage(increment: number) {
        if (this.canIncrementPage(increment)) {
            const index = this.pagination.index + this.pagination.pageLength * increment;
            this.pagination = {index, pageLength: this.pagination.pageLength};
        }
    }

    canIncrementPage(increment: number) {
        const increasedIndex = this.pagination.index + (this.pagination.pageLength * increment);
        return increasedIndex === 0 || (increasedIndex >= 0 && increasedIndex < this.data.length);
    }

    setPageLength(pageLength: number) {
        this.pagination = {index: 0, pageLength};
    }
}
