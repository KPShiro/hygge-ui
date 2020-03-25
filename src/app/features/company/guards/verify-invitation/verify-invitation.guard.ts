import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';


@Injectable({
    providedIn: 'root'
})
export class VerifyInvitationGuard implements CanActivate {
    public constructor(
        private readonly _router: Router,
    ) { }

    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (isNullOrUndefined(route.queryParams.invitationId)) {
            this._router.navigate(['/sign-up/invalid-invitation']);

            return false;
        }

        return true;
    }
}
