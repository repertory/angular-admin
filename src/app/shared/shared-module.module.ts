import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {CovalentCoreModule} from '@covalent/core';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        HttpModule,
        CovalentCoreModule,
    ]
})
export class SharedModuleModule {
}
