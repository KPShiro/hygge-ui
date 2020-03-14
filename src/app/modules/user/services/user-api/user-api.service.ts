import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISignUpDto } from '@modules/auth/dtos/sign-up.dto';
import { IToken } from '@modules/user/interfaces/token.interface';
import { IUserData } from '@modules/user/interfaces/user-data.interface';
import { delay } from 'rxjs/operators';


@Injectable()
export class UserApi {
    public constructor(
        private readonly httpClient: HttpClient,
    ) { }

    public signInWithUsernameAndPassword(username: string, password: string): Observable<IToken> {
        const url = `${environment.api.auth.url}${environment.api.auth.endpoints.login}`;

        return this.httpClient.post<IToken>(url, { username, password });
    }

    public signOut(): Observable<void> {
        const url = `${environment.api.auth.url}${environment.api.auth.endpoints.logout}`;

        return this.httpClient.get<void>(url);
    }

    public createAccount(dto: ISignUpDto): Observable<IToken> {
        const url = `${environment.api.auth.url}${environment.api.auth.endpoints.register}`;

        return this.httpClient.post<IToken>(url, dto);
    }

    public fetchUserData(): Observable<IUserData> {
        return of({
            firstName: 'Kacper',
            lastName: 'Popczynski',
        }).pipe(
            delay(700),
        );
    }
}
