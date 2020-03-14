import { createAction, props } from '@ngrx/store';
import { IToken } from '../interfaces/token.interface';


function createActionName(name: string): string {
    return `[Auth] ${name}`;
}

export const signIn = createAction(
    createActionName('Sign in'),
    props<{ payload: { username: string, password: string } }>(),
);

export const signInSucceeded = createAction(
    createActionName('Sign in: Succeeded'),
    props<{ payload: IToken }>(),
);

export const signInFailed = createAction(
    createActionName('Sign in: Failed'),
);

export const signOut = createAction(
    createActionName('Sign out'),
);

export const signOutSucceeded = createAction(
    createActionName('Sign out: Succeeded'),
);

export const signOutFailed = createAction(
    createActionName('Sign out: Failed'),
);
