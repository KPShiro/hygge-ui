import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthFacadeService } from '../services/auth-facade/auth-facade.service';


@Injectable({ providedIn: 'root' })
export class IsAuthenticatedGuard implements CanActivate {
    public constructor(
        private readonly _authFacade: AuthFacadeService,
        private readonly _router: Router,
    ) { }

    public canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
        const token = this._authFacade.token;

        if (token !== undefined && token !== null) {
            return true;
        }

        this._router.navigate(['/sign-in'], {
            queryParams: {
                returnUrl: _state.url,
            },
        });

        return false;
    }
}
