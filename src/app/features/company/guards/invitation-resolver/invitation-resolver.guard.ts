import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyApiService } from '@features/company/services/company-api/company-api.service';
import { IInvitation } from '@features/company/interfaces/invitation.interface';


@Injectable()
export class InvitationResolver implements Resolve<any> {
    public constructor(
        private readonly _companyApi: CompanyApiService,
    ) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<IInvitation> {
        return this._companyApi.getInvitationDetails(route.queryParams.invitationId);
    }
}
