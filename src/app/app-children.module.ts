import { NgModule } from '@angular/core';

import { ErrorModule } from './error/error.module';
import { IndexModule } from './index/index.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    ErrorModule,
    IndexModule,
    LoginModule,
  ]
})
export class AppChildrenModule {
}
