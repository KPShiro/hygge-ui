import { Injectable } from '@angular/core';
import { CompanyApiService } from '../company-api/company-api.service';
import { Observable } from 'rxjs';


@Injectable()
export class CompanyFacadeService {
    public constructor(
        private readonly _companyApi: CompanyApiService,
    ) { }

    public createInvitation(email: string): Observable<any> {
        return this._companyApi.createInvitation(email);
    }

    public deleteInvitation(id: string): Observable<void> {
        return this._companyApi.deleteInvitation(id);
    }

    public getInvitations(): Observable<any> {
        return this._companyApi.getInvitations();
    }

    public getEmployees(): Observable<any> {
        return this._companyApi.getEmployees();
    }
}
