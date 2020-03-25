import { IToken } from '../interfaces/token.interface';


export interface IAuthState {
    token: IToken;
    errors: string[];
}

export const DEFAULT_AUTH_STATE: IAuthState = {
    errors: [],
    token: null,
};
