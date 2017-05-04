import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {AdminDialogComponent} from './admin-dialog.component';

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule,
    ],
    declarations: [AdminComponent, AdminDialogComponent],
    entryComponents: [AdminDialogComponent]
})
export class AdminModule {
}
