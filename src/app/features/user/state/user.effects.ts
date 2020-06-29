import * as userActions from './user.actions';
import * as authActions from '@features/auth/state/auth.actions';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserApiService } from '../services/user-api/user-api.service';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class UserEffects {
    public createAccount$ = createEffect(() => this._actions$.pipe(
        ofType(userActions.createAccount),
        mergeMap((action) => this._userApi.createAccount(action.payload).pipe(
            map((token) => userActions.createAccountSucceeded({ payload: token })),
            catchError((errorResponse) => of(userActions.createAccountFailed({ payload: errorResponse }))),
        )),
    ));

    public createAccountSucceeded$ = createEffect(() => this._actions$.pipe(
        ofType(userActions.createAccountSucceeded),
        map((action) => action.payload),
        map((token) => authActions.signInSucceeded({ payload: token })),
    ));

    public createAccountFailed$ = createEffect(() => this._actions$.pipe(
        ofType(userActions.createAccountFailed),
        map((action) => action.payload),
    ), { dispatch: false });

    public constructor(
        private readonly _actions$: Actions,
        private readonly _userApi: UserApiService,
    ) { }
}
