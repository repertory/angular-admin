import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Parse } from 'parse';

@Injectable({
  providedIn: 'root'
})
export class AppAuthGuard implements CanActivateChild {

  constructor(private router: Router) {
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log({ next, state });
    if (next.data.auth === false) {
      return true;
    }
    if (!Parse.User.current()) {
      this.router.navigate(['/login', { next: state.url }]);
      return false;
    }
    return true;
  }

}
