import * as actions from '@features/auth/state/auth.actions';

import { Injectable } from '@angular/core';
import { IToken } from '@features/auth/interfaces/token.interface';
import { isNullOrUndefined } from 'util';
import { Store } from '@ngrx/store';
import { IAuthState } from '@features/auth/state/auth.state';


@Injectable()
export class AuthStateService {
    private readonly localStorageKey = '__hygge_token__';

    public constructor(
        private readonly _store: Store<IAuthState>,
    ) {
        const savedToken = this.loadToken();

        if (!isNullOrUndefined(savedToken)) {
            this._store.dispatch(actions.signInSucceeded({ payload: savedToken }));
        }
    }

    public saveToken(token: IToken): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(token));
    }

    public loadToken(): IToken | undefined {
        const data: string | null = localStorage.getItem(this.localStorageKey);

        if (isNullOrUndefined(data)) {
            return undefined;
        }

        return JSON.parse(data);
    }
}
