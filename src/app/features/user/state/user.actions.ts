import { createAction, props } from '@ngrx/store';
import { ICreateUserAccountDto } from '../dto/create-user-account.dto';
import { IToken } from '@features/auth/interfaces/token.interface';
import { HttpErrorResponse } from '@angular/common/http';


function createActionName(name: string): string {
    return `[User] ${name}`;
}

export const createAccount = createAction(
    createActionName('Create account'),
    props<{ payload: ICreateUserAccountDto }>(),
);

export const createAccountSucceeded = createAction(
    createActionName('Create account: Succeeded'),
    props<{ payload: IToken }>(),
);

export const createAccountFailed = createAction(
    createActionName('Create account: Failed'),
    props<{ payload: HttpErrorResponse }>(),
);
