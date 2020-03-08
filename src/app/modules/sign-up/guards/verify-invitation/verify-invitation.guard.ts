import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';


@Injectable({
  providedIn: 'root'
})
export class VerifyInvitationGuard implements CanActivate {
  constructor(
    private readonly router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (isNullOrUndefined(route.queryParams.invitationId)) {
      this.router.navigate(['/sign-up/invalid-invitation']);
      return false;
    }

    return true;
  }
}
