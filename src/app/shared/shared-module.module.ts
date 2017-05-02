import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@angular/material';
import {Md2Module}  from 'md2';

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
        FlexLayoutModule,
        MaterialModule,
        Md2Module,
    ]
})
export class SharedModuleModule {
}
