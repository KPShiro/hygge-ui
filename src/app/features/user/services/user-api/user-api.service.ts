import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateUserAccountDto } from '@features/user/dto/create-user-account.dto';
import { IDeleteUserAccountDto } from '@features/user/dto/delete-user-account.dto';


@Injectable()
export class UserApiService {

    public constructor(
        private readonly _httpClient: HttpClient,
    ) { }

    public verifyUsername(username: string): Observable<boolean> {
        const url = `${environment.api.v2.url}${environment.api.v2.account.url}${environment.api.v2.account.endpoints.verifyUsername}`;

        let params: HttpParams = new HttpParams();

        if (username !== '' && username !== null && username !== undefined) {
            params = params.set('username', username);
        }

        return this._httpClient.get<boolean>(url, { params });
    }

    public createAccount(dto: ICreateUserAccountDto): Observable<{ username: string, password: string }> {
        const url = `${environment.api.v2.url}${environment.api.v2.account.url}${environment.api.v2.account.endpoints.create}`;

        return this._httpClient.post<{ username: string, password: string }>(url, dto);
    }

    public deleteAccount(dto: IDeleteUserAccountDto): Observable<any> {
        const url = `${environment.api.v2.url}${environment.api.v2.account.url}${environment.api.v2.account.endpoints.delete}`;

        return this._httpClient.post<any>(url, { id: dto.id });
    }
}
