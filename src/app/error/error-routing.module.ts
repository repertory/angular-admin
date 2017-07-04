import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {ErrorComponent} from './error.component';

export const routerConfig: Route[] = [
  {path: 'error/:code', component: ErrorComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routerConfig)
  ],
  exports: [RouterModule]
})
export class ErrorRoutingModule {
}
