import { Injectable } from '@angular/core';
import { IToken } from '@features/auth/interfaces/token.interface';


@Injectable()
export class AuthStateService {
    private readonly localStorageKey = '__hygge_token__';

    public saveToken(token: IToken): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(token));
    }

    public loadToken(): IToken | undefined {
        const data: string | null = localStorage.getItem(this.localStorageKey);

        if (data === null || data === undefined) {
            return undefined;
        }

        return JSON.parse(data);
    }
}
