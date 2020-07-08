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

    public verifyInvitation(invitationId: string): Observable<IInvitation> {
        const url = `${environment.api.v2.url}${environment.api.v2.organization.url}${environment.api.v2.organization.endpoints.verifyInvitation}`;

        return this._httpClient.post<IInvitation>(url, { invitationId }).pipe(
            catchError((response) => throwError(response)),
        );
    }

    public getEmployees(): Observable<any[]> {
        const url = `${environment.api.v2.url}${environment.api.v2.organization.url}${environment.api.v2.organization.endpoints.getEmployees}`;

        return this._httpClient.get<any[]>(url).pipe(
            catchError((response) => throwError(response)),
        );
    }

    public getInvitations(): Observable<IInvitation[]> {
        const url = `${environment.api.v2.url}${environment.api.v2.organization.url}${environment.api.v2.organization.endpoints.getInvitations}`;

        return this._httpClient.get<any[]>(url).pipe(
            catchError((response) => throwError(response)),
        );
    }

    public createInvitation(email: string): Observable<any> {
        const url = `${environment.api.v2.url}${environment.api.v2.organization.url}${environment.api.v2.organization.endpoints.invite}`;

        return this._httpClient.post<any>(url, email).pipe(
            catchError((response) => throwError(response)),
        );
    }

    public deleteInvitation(invitationId: string): Observable<void> {
        const url = `${environment.api.v2.url}${environment.api.v2.organization.url}${environment.api.v2.organization.endpoints.deleteInvitation}`;

        return this._httpClient.post<void>(url, { invitationId }).pipe(
            catchError((response) => throwError(response)),
        );
    }
}
