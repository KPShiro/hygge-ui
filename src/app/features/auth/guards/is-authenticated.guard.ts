import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthFacadeService } from '../services/auth-facade/auth-facade.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class IsAuthenticatedGuard implements CanActivate {
    public constructor(
        private readonly _authFacade: AuthFacadeService,
        private readonly _router: Router,
    ) { }

    public canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
        return this._authFacade.isAuthenticated$.pipe(
            map((isAuthenticated) => {
                if (!isAuthenticated) {
                    this._router.navigate(['/sign-in'], {
                        queryParams: {
                            returnUrl: _state.url,
                        },
                        queryParamsHandling: 'merge',
                        preserveQueryParams: true,
                    });
                }

                return isAuthenticated;
            }),
        );
    }
}
