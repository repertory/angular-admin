import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatSnackBarModule,
} from '@angular/material';

import { ParseModule, MaterialModule } from '@shared/shared.module';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppAuthGuard } from './app-auth.guard';
import { AppBannerDirective } from './app-banner.directive';

@NgModule({
  declarations: [
    AppComponent,
    AppBannerDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    LayoutModule,
    ScrollingModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatSnackBarModule,
    ParseModule.initialize(environment.parse),
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [
    AppAuthGuard,
    {
      provide: LOCALE_ID,
      useValue: 'zh-cn'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
