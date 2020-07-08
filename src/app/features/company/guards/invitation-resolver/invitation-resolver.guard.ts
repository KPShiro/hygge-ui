import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { CompanyApiService } from '@features/company/services/company-api/company-api.service';
import { IInvitation } from '@features/company/interfaces/invitation.interface';
import { catchError } from 'rxjs/operators';


@Injectable()
export class InvitationResolver implements Resolve<any> {
    public constructor(
        private readonly _companyApi: CompanyApiService,
        private readonly _router: Router,
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<IInvitation> {
        return this._companyApi.verifyInvitation(route.queryParams.invitationId).pipe(
            catchError(() => {
                this._router.navigate(['/invalid-invitation']);

                return EMPTY;
            }),
        );
    }
}
