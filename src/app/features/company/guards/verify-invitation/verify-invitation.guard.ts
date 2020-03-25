import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { CompanyApiService } from '@features/company/services/company-api/company-api.service';
import { map, catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class VerifyInvitationGuard implements CanActivate {
    public constructor(
        private readonly _router: Router,
        private readonly _companyApi: CompanyApiService,
    ) { }

    public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const invitationId = route.queryParams.invitationId;

        if (isNullOrUndefined(invitationId)) {
            this.navigateToInvalidInvitationPage();

            return false;
        }

        return this._companyApi.validateInvitation(invitationId).pipe(
            map((isValid) => {
                if (!isValid) {
                    this.navigateToInvalidInvitationPage();

                    return false;
                }

                return true;
            }),
            catchError(() => {
                this.navigateToInvalidInvitationPage();

                return of(false);
            }),
        );
    }

    private navigateToInvalidInvitationPage(): void {
        this._router.navigate(['/sign-up/invalid-invitation']);
    }
}
