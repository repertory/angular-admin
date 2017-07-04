import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {SetupComponent} from './setup.component';

export const routerConfig: Route[] = [
  {path: 'setup', component: SetupComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routerConfig)
  ],
  exports: [RouterModule]
})
export class SetupRoutingModule {
}
