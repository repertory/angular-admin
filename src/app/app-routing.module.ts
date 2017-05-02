import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';
import {PathLocationStrategy, Location, LocationStrategy} from '@angular/common';

export const routerConfig: Route[] = [
    {path: '', loadChildren: './app-children.module#AppChildrenModule'},
    {path: '**', redirectTo: '/error/404', pathMatch: 'full'}
];

@NgModule({
    providers: [
        Location,
        {provide: LocationStrategy, useClass: PathLocationStrategy}
    ],
    imports: [
        RouterModule.forRoot(routerConfig)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
