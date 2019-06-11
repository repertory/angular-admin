import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppAuthGuard } from './app-auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './app-children.module#AppChildrenModule',
    canActivateChild: [AppAuthGuard]
  },
  {
    path: '**',
    redirectTo: '/error',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
