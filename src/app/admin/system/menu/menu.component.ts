import {Component, OnInit} from '@angular/core';
import {ITdDataTableColumn} from '@covalent/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    data: any[] = [
        {sku: '1452-2', item: 'Pork Chops', price: 32.11},
        {sku: '1421-0', item: 'Prime Rib', price: 41.15},
    ];
    columns: ITdDataTableColumn[] = [
        {name: 'sku', label: 'SKU #', tooltip: 'Stock Keeping Unit'},
        {name: 'item', label: 'Item name'},
        {name: 'price', label: 'Price (US$)', numeric: true, format: v => v.toFixed(2) },
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
