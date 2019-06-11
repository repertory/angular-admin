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
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatPaginatorIntl
} from '@angular/material';

import { environment } from '../environments/environment';
import { AppPaginatorIntl } from './app-paginator.intl';
import { AppRoutingModule } from './app-routing.module';
import { AppParseModule } from './app-parse.module';
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
    AppParseModule.initialize(environment.parse),
    AppRoutingModule,
  ],
  providers: [
    AppAuthGuard,
    {
      provide: LOCALE_ID,
      useValue: 'zh-cn'
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 2500,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    },
    {
      provide: MatPaginatorIntl,
      useClass: AppPaginatorIntl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
