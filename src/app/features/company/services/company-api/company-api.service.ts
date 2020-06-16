import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { IInvitation } from '@features/company/interfaces/invitation.interface';


@Injectable()
export class CompanyApiService {
    public constructor(
        private readonly _httpClient: HttpClient,
    ) { }

    public validateInvitation(id: string): Observable<boolean> {
        const url = environment.api.companyAccount.url + environment.api.companyAccount.endpoints.validateInvitation;

        return this._httpClient.post<boolean>(url, { id }).pipe(
            catchError((response) => throwError(response)),
        );
    }

    public getInvitationDetails(id: string): Observable<IInvitation> {
        const url = environment.api.companyAccount.url + environment.api.companyAccount.endpoints.getInvitationDetils;

        return this._httpClient.post<IInvitation>(url, { id }).pipe(
            catchError((response) => throwError(response)),
        );
    }

    public getEmployees(): Observable<any[]> {
        const url = environment.api.companyAccount.url + environment.api.companyAccount.endpoints.employees;

        return this._httpClient.get<any[]>(url).pipe(
            catchError((response) => throwError(response)),
        );
    }

    public getInvitations(): Observable<IInvitation[]> {
        const url = environment.api.companyAccount.url + environment.api.companyAccount.endpoints.getInvitations;

        return this._httpClient.get<any[]>(url).pipe(
            catchError((response) => throwError(response)),
        );
    }
}
