import * as actions from './auth.actions';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApiService } from '../services/auth-api/auth-api.service';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

    signIn$ = createEffect(() => this._actions$.pipe(
        ofType(actions.signIn),
        mergeMap((action) => this._authApi.signInWithUsernameAndPassword(action.payload.username, action.payload.password).pipe(
            map((token) => actions.signInSucceeded({ payload: token })),
            catchError(() => of(actions.signInFailed())),
        )),
    ));

    signInSucceeded$ = createEffect(() => this._actions$.pipe(
        ofType(actions.signInSucceeded),
        map((action) => action.payload),
        tap((token) => localStorage.setItem('token', JSON.stringify(token))),
        tap(() => this._router.navigate(['/dashboard'])),
    ), { dispatch: false });

    signOut$ = createEffect(() => this._actions$.pipe(
        ofType(actions.signOut),
        mergeMap(() => this._authApi.signOut().pipe(
            map(() => actions.signOutSucceeded()),
            catchError(() => of(actions.signOutFailed())),
        )),
    ));

    signOutSucceeded$ = createEffect(() => this._actions$.pipe(
        ofType(actions.signOutSucceeded),
        tap(() => localStorage.clear()),
        tap(() => this._router.navigate(['/sign-in'])),
    ), { dispatch: false });

    constructor(
        private readonly _actions$: Actions,
        private readonly _authApi: AuthApiService,
        private readonly _router: Router,
    ) { }
}
