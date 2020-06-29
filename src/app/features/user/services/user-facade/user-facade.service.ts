import * as actions from '@features/user/state/user.actions';

import { Injectable } from '@angular/core';
import { UserApiService } from '../user-api/user-api.service';
import { Observable } from 'rxjs';
import { ICreateUserDto } from '@features/user/interfaces/create-user-dto.interface';
import { Store } from '@ngrx/store';
import { IUserState } from '@features/user/state/user.state';


@Injectable()
export class UserFacadeService {

    public constructor(
        private readonly _store: Store<IUserState>,
        private readonly _userApi: UserApiService,
    ) { }

    public checkUsernameAvailability(username: string): Observable<boolean> {
        return this._userApi.checkUsernameAvailability(username);
    }

    public createAccount(dto: ICreateUserDto): void {
        this._store.dispatch(actions.createAccount({ payload: dto }));
    }
}
