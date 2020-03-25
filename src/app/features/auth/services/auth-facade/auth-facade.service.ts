import * as actions from '@features/auth/state/auth.actions';
import * as selectors from '@features/auth/state/auth.selectors';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAuthState } from '@features/auth/state/auth.state';
import { Observable } from 'rxjs';
import { IToken } from '@features/auth/interfaces/token.interface';


@Injectable()
export class AuthFacadeService {

  public isAuthenticated$: Observable<boolean> = this._store.select(selectors.isAuthenticated);
  public token$: Observable<IToken> = this._store.select(selectors.token);
  public errors$: Observable<string[]> = this._store.select(selectors.errors);

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
