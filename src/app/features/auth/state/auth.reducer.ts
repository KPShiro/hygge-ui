import * as actions from './auth.actions';

import { createReducer, ActionReducer, Action, on } from '@ngrx/store';
import { DEFAULT_AUTH_STATE, IAuthState } from './auth.state';


const _reducer: ActionReducer<IAuthState, Action> = createReducer(
    DEFAULT_AUTH_STATE,
    on(actions.signInSucceeded, (state, { payload }) => ({
        ...state,
        token: payload,
    })),
    on(actions.signOutSucceeded, (state) => ({
        ...state,
        token: undefined,
    })),
);

export function reducer(state: IAuthState, action: Action): IAuthState {
    return _reducer(state, action);
}
