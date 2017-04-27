import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

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
        MaterialModule,
        FlexLayoutModule,
    ]
})
export class SharedModuleModule {
}
