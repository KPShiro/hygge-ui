import * as actions from '@features/auth/state/auth.actions';
import * as selectors from '@features/auth/state/auth.selectors';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAuthState } from '@features/auth/state/auth.state';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { IToken } from '@features/auth/interfaces/token.interface';


@Injectable()
export class AuthFacadeService {

  public isAuthenticated$: Observable<boolean> = this._store.select(selectors.isAuthenticated);

  public get token(): IToken | null {
    const stringifiedToken: string | null = localStorage.getItem('token');

    if (isNullOrUndefined(stringifiedToken)) {
      return null;
    }

    return JSON.parse(stringifiedToken);
  }

  public constructor(
    private readonly _store: Store<IAuthState>,
  ) { }

  public signInWithUsernameAndPassword(username: string, password: string): void {
    this._store.dispatch(actions.signIn({ payload: { username, password } }));
  }

  public signOut(): void {
    this._store.dispatch(actions.signOut());
  }
}
