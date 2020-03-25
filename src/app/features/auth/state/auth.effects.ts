import * as actions from './auth.actions';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApiService } from '../services/auth-api/auth-api.service';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { of } from 'rxjs';
import { AuthStateService } from '../services/auth-state/auth-state.service';


@Injectable()
export class AuthEffects {

    public signIn$ = createEffect(() => this._actions$.pipe(
        ofType(actions.signIn),
        mergeMap((action) => this._authApi.signInWithUsernameAndPassword(action.payload.username, action.payload.password).pipe(
            map((token) => actions.signInSucceeded({ payload: token })),
            catchError((errorResponse) => of(actions.signInFailed({ payload: errorResponse }))),
        )),
    ));

    public signInSucceeded$ = createEffect(() => this._actions$.pipe(
        ofType(actions.signInSucceeded),
        map((action) => action.payload),
        tap((token) => this._authStateService.saveToken(token)),
        map(() => this._route.snapshot.queryParams.returnUrl),
        tap((returnUrl) => {
            if (!isNullOrUndefined(returnUrl)) {
                this._router.navigateByUrl(returnUrl);
            } else {
                this._router.navigate(['/dashboard']);
            }
        }),
    ), { dispatch: false });

    public signOut$ = createEffect(() => this._actions$.pipe(
        ofType(actions.signOut),
        mergeMap(() => this._authApi.signOut().pipe(
            map(() => actions.signOutSucceeded()),
            catchError((errorResponse) => of(actions.signOutFailed({ payload: errorResponse }))),
        )),
    ));

    public signOutSucceeded$ = createEffect(() => this._actions$.pipe(
        ofType(actions.signOutSucceeded),
        tap(() => localStorage.clear()),
        tap(() => this._router.navigate(['/sign-in'])),
    ), { dispatch: false });

    public constructor(
        private readonly _actions$: Actions,
        private readonly _authApi: AuthApiService,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
        private readonly _authStateService: AuthStateService,
    ) { }
}
