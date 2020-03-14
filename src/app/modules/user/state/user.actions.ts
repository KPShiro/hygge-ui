import { createAction, props } from '@ngrx/store';
import { IUserData } from '../interfaces/user-data.interface';


export const saveUserData = createAction(
    '[User] Save user data',
    props<{ payload: IUserData }>(),
);

export const clearState = createAction('[User] Clear state');
