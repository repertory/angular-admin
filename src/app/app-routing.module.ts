import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {environment} from '../environments/environment';
import {GuardService} from './shared/shared.module';

import {AppComponent} from './app.component';

export const routerConfig: Route[] = [
    {
        path: '',
        component: AppComponent,
        canActivateChild: [GuardService],
        loadChildren: './app-children.module#AppChildrenModule'
    },
    {path: '**', redirectTo: '/error/404', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routerConfig, environment.router)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
