import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '@angular/material';
import {
    CovalentDataTableModule,
    CovalentDialogsModule,
    CovalentNotificationsModule,
    CovalentPagingModule,
    CovalentSearchModule
} from '@covalent/core';

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
        CovalentDataTableModule,
        CovalentDialogsModule,
        CovalentNotificationsModule,
        CovalentPagingModule,
        CovalentSearchModule
    ]
})
export class SharedModuleModule {
}
