import * as actions from '@features/user/state/user.actions';

import { Injectable } from '@angular/core';
import { UserApiService } from '../user-api/user-api.service';
import { Observable, of } from 'rxjs';
import { ICreateUserDto } from '@features/user/interfaces/create-user-dto.interface';
import { Store } from '@ngrx/store';
import { IUserState } from '@features/user/state/user.state';
import { FacebookSdkService } from '@features/facebook/services/facebook-sdk/facebook-sdk.service';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class UserFacadeService {

    public constructor(
        private readonly _store: Store<IUserState>,
        private readonly _userApi: UserApiService,
        private readonly _facebookSdkService: FacebookSdkService,
    ) { }

    public checkUsernameAvailability(username: string): Observable<boolean> {
        return this._userApi.checkUsernameAvailability(username);
    }

    public createAccount(dto: ICreateUserDto): void {
        this._store.dispatch(actions.createAccount({ payload: dto }));
    }

    public addSocialAccountLink(): Observable<any> {
        return this._facebookSdkService.loginToFacebook().pipe(
            switchMap((response: any) => {
                const authResponse: any = response.authResponse;

                if (authResponse !== undefined && authResponse !== null) {
                    return this._userApi.linkSocialAccount({
                        user_id: authResponse.userID,
                        access_token: authResponse.accessToken,
                        granted_scopes: authResponse.grantedScopes
                    });
                }

                return of(undefined);
            }),
        );
    }

    public removeSocialAccountLink(): void {
        this._facebookSdkService.logoutFromFacebook().subscribe((x) => console.log(x));
    }
}
