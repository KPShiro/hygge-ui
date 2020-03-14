export interface IAuthState {
    isAuthenticated: boolean;
}

export const DEFAULT_AUTH_STATE: IAuthState = {
    isAuthenticated: false,
};
