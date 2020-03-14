import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from '../interfaces/user-state.interface';


const featureSelector = createFeatureSelector('user');

export const userData = createSelector(
    featureSelector,
    (state: IUserState) => state.userData
);
