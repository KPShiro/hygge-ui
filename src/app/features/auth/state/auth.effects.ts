import * as actions from './auth.actions';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApiService } from '../services/auth-api/auth-api.service';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class AuthEffects {

    signIn$ = createEffect(() => this._actions$.pipe(
        ofType(actions.signIn),
        mergeMap((action) => this._authApi.signInWithUsernameAndPassword(action.payload.username, action.payload.password).pipe(
            map((token) => {
                localStorage.setItem('token', JSON.stringify(token));
                return actions.signInSucceeded();
            }),
            catchError(() => of(actions.signInFailed())),
        )),
    ));

    signOut$ = createEffect(() => this._actions$.pipe(
        ofType(actions.signOut),
        mergeMap(() => this._authApi.signOut().pipe(
            map(() => actions.signOutSucceeded()),
            catchError(() => of(actions.signOutFailed())),
        )),
    ));

    constructor(
        private _actions$: Actions,
        private _authApi: AuthApiService,
    ) { }
}
