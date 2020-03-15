import { IToken } from '../interfaces/token.interface';


export interface IAuthState {
    token?: IToken;
}

export const DEFAULT_AUTH_STATE: IAuthState = {};
