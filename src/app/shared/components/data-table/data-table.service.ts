import {Injectable} from '@angular/core';
import {CollectionViewer} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ParseService} from '../../services/services.module';

// init参数接口
export interface InputInterface {
    className: string;
}

@Injectable()
export class DataTableService {

    public data: any[] = [
        {
            id: '1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: '2',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ];
    public filter: string;

    private input: InputInterface;
    private renderedData: any[] = [];

    constructor(private parse: ParseService) {
    }

    init(input: InputInterface): Promise<any> {
        this.input = input;

        return new Promise((resolve, reject) => {
            this.parse.query(this.input.className).subscribe(
                res => {
                    this.data = Array.from(res);
                    resolve(res);
                },
                err => reject(err)
            );
        });
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return collectionViewer.viewChange.map((view: { start: number, end: number }) => {
            // Set the rendered rows length to the virtual page size. Fill in the data provided
            // from the index start until the end index or pagination size, whichever is smaller.
            this.renderedData.length = this.data.length;

            const buffer = 20;
            const rangeStart = Math.max(0, view.start - buffer);
            const rangeEnd = Math.min(this.data.length, view.end + buffer);

            for (let i = rangeStart; i < rangeEnd; i++) {
                this.renderedData[i] = this.data[i];
            }

            return this.renderedData;
        });
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
        return increasedIndex == 0 ||
            (increasedIndex >= 0 && increasedIndex < this.data.length);
    }

    setPageLength(pageLength: number) {
        this.pagination = {index: 0, pageLength};
    }
}
