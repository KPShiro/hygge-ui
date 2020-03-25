import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IToken } from '@features/auth/interfaces/token.interface';


@Injectable()
export class AuthApiService {

    public constructor(
        private readonly _httpClient: HttpClient,
    ) { }

    public signInWithUsernameAndPassword(username: string, password: string): Observable<IToken> {
        const url = `${environment.api.auth.url}${environment.api.auth.endpoints.login}`;

        return this._httpClient.post<IToken>(url, { username, password });
    }

    public signOut(): Observable<void> {
        const url = `${environment.api.auth.url}${environment.api.auth.endpoints.logout}`;

        return this._httpClient.get<void>(url);
    }
}
