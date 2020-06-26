import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class UserApiService {

    public constructor(
        private readonly _httpClient: HttpClient,
    ) { }

    public checkUsernameAvailability(username: string): Observable<boolean> {
        const url = `${environment.api.userAccount.url}${environment.api.userAccount.endpoints.isUsernameAvailable}`;

        return this._httpClient.post<boolean>(url, { username });
    }

    public createAccount(dto: any): Observable<any> {
        const url = `${environment.api.userAccount.url}${environment.api.userAccount.endpoints.create}`;

        return this._httpClient.post<any>(url, dto);
    }

    public linkSocialAccount(dto: any): Observable<any> {
        const url = `${environment.api.userAccount.url}${environment.api.userAccount.endpoints.linkSocialAccount}`;

        return this._httpClient.post<any>(url, dto);
    }
}
