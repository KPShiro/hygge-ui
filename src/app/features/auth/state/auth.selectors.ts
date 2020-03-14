import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from './auth.state';


const selectFeature = createFeatureSelector('auth');

export const isAuthenticated = createSelector(
    selectFeature,
    (state: IAuthState) => state.isAuthenticated,
);
