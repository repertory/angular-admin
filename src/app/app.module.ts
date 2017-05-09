import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {AppParseModule} from './app-parse.module';
import {AppGuardService} from './app-guard.service';
import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule,
        AppParseModule,
    ],
    providers: [
        AppGuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
