// import * as actions from './user.actions';

import { createReducer, ActionReducer, Action } from '@ngrx/store';
import { IUserState, DEFAULT_USER_STATE } from './user.state';


const _reducer: ActionReducer<IUserState, Action> = createReducer(
    DEFAULT_USER_STATE,
);

export function reducer(state: IUserState, action: Action): IUserState {
    return _reducer(state, action);
}
