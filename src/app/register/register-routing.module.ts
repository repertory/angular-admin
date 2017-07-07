import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {RegisterComponent} from './register.component';

export const routerConfig: Route[] = [
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routerConfig)
  ],
  exports: [RouterModule]
})
export class RegisterRoutingModule {
}
