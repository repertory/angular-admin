import {NgModule} from '@angular/core';

import {ErrorModule} from './error/error.module';
import {ForgetModule} from './forget/forget.module';
import {LoginModule} from './login/login.module';
import {RegisterModule} from './register/register.module';
import {LayoutModule} from './layout/layout.module';

@NgModule({
  imports: [
    ErrorModule,
    ForgetModule,
    LoginModule,
    RegisterModule,
    LayoutModule,
  ]
})
export class AppChildrenModule {
  constructor() {
    const selector = document.querySelector('body > .preload');
    if (selector && selector.remove) {
      setTimeout(() => selector.remove(), 10);
    }
  }
}
