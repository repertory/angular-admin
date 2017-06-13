import {Injectable} from '@angular/core';
import {CollectionViewer} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {ParseService} from '../../services/services.module';

// init参数接口
export interface InputInterface {
    className: string;
}

@Injectable()
export class DataTableService {

    public data: any[] = [];

    private input: InputInterface;
    private renderedData: any[] = [];

    constructor(private parse: ParseService) {
    }

    init(input?: InputInterface): Promise<any> {
        if (input) {
            this.input = input;
        }

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
}
