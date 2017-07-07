import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {LoginComponent} from './login.component';

export const routerConfig: Route[] = [
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routerConfig)
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
