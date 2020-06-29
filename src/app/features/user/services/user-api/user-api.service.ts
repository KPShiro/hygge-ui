import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateUserAccountDto } from '@features/user/dto/create-user-account.dto';
import { IDeleteUserAccountDto } from '@features/user/dto/delete-user-account.dto';


@Injectable()
export class UserApiService {

    public constructor(
        private readonly _httpClient: HttpClient,
    ) { }

    public checkUsernameAvailability(username: string): Observable<boolean> {
        const url = `${environment.api.userAccount.url}${environment.api.userAccount.endpoints.check.username}`;

        return this._httpClient.post<boolean>(url, { username });
    }

    public createAccount(dto: ICreateUserAccountDto): Observable<any> {
        const url = `${environment.api.userAccount.url}${environment.api.userAccount.endpoints.create}`;

        return this._httpClient.post<any>(url, dto);
    }

    public deleteAccount(dto: IDeleteUserAccountDto): Observable<any> {
        let url = `${environment.api.userAccount.url}${environment.api.userAccount.endpoints.delete}`;

        if (dto.deleteForever) {
            url = `${environment.api.userAccount.url}${environment.api.userAccount.endpoints.deleteForever}`;
        }

        return this._httpClient.post<any>(url, { id: dto.id });
    }
}
