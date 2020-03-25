import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from './auth.state';
import { isNullOrUndefined } from 'util';


const selectFeature = createFeatureSelector('auth');

export const isAuthenticated = createSelector(
    selectFeature,
    (state: IAuthState) => isNullOrUndefined(state.token) ? false : true,
);

export const token = createSelector(
    selectFeature,
    (state: IAuthState) => state.token,
);

export const errors = createSelector(
    selectFeature,
    (state: IAuthState) => state.errors,
);
