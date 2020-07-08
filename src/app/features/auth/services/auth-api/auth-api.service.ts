import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IToken } from '@features/auth/interfaces/token.interface';


@Injectable()
export class AuthApiService {

    public constructor(
        private readonly _httpClient: HttpClient,
    ) { }

    public signInWithUsernameAndPassword(username: string, password: string): Observable<IToken> {
        const url = `${environment.api.v2.url}${environment.api.v2.auth.url}${environment.api.v2.auth.endpoints.login}`;

        return this._httpClient.post<IToken>(url, { username, password });
    }

    public signOut(): Observable<void> {
        const url = `${environment.api.v2.url}${environment.api.v2.auth.url}${environment.api.v2.auth.endpoints.logout}`;

        return this._httpClient.get<void>(url);
    }

    public refreshToken(refreshToken: string): Observable<IToken> {
        const url = `${environment.api.v2.url}${environment.api.v2.auth.url}${environment.api.v2.auth.endpoints.token}`;

        let params: HttpParams = new HttpParams();

        if (params !== undefined && params !== null) {
            params = params.set('refreshToken', refreshToken);
        }

        return this._httpClient.get<IToken>(url, { params });
    }
}
