import * as actions from '@features/user/state/user.actions';

import { Injectable } from '@angular/core';
import { UserApiService } from '../user-api/user-api.service';
import { Observable } from 'rxjs';
import { ICreateUserAccountDto } from '@features/user/dto/create-user-account.dto';
import { Store } from '@ngrx/store';
import { IUserState } from '@features/user/state/user.state';
import { IDeleteUserAccountDto } from '@features/user/dto/delete-user-account.dto';


@Injectable()
export class UserFacadeService {

    public constructor(
        private readonly _store: Store<IUserState>,
        private readonly _userApi: UserApiService,
    ) { }

    public checkUsernameAvailability(username: string): Observable<boolean> {
        return this._userApi.checkUsernameAvailability(username);
    }

    public createAccount(dto: ICreateUserAccountDto): void {
        this._store.dispatch(actions.createAccount({ payload: dto }));
    }

    public deleteAccount(dto: IDeleteUserAccountDto): Observable<void> {
        return this._userApi.deleteAccount(dto);
    }
}
