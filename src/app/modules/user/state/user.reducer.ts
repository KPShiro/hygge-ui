import { createReducer, Action, on } from '@ngrx/store';
import { IUserState } from '../interfaces/user-state.interface';
import { clearState, saveUserData } from './user.actions';


export const defaultState: IUserState = {
    userData: null,
};

const _reducer = createReducer(
    defaultState,
    on(clearState, () => defaultState),
    on(saveUserData, (state, { payload }) => ({
        ...state,
        userData: payload,
    })),
);

export function reducer(state: IUserState, action: Action): IUserState {
    return _reducer(state, action);
}
