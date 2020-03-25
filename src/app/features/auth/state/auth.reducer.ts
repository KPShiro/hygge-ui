import * as actions from './auth.actions';

import { createReducer, ActionReducer, Action, on } from '@ngrx/store';
import { DEFAULT_AUTH_STATE, IAuthState } from './auth.state';
import { union } from 'lodash-es';


const _reducer: ActionReducer<IAuthState, Action> = createReducer(
    DEFAULT_AUTH_STATE,
    on(actions.signInSucceeded, (state, { payload }) => ({
        ...state,
        token: payload,
        errors: DEFAULT_AUTH_STATE.errors,
    })),
    on(actions.signInFailed, (state, { payload }) => ({
        ...state,
        errors: union(state.errors, [payload.error.message]),
    })),
    on(actions.signOutSucceeded, (state) => ({
        ...state,
        ...DEFAULT_AUTH_STATE
    })),
);

export function reducer(state: IAuthState, action: Action): IAuthState {
    return _reducer(state, action);
}
