import { Injectable } from '@angular/core';
import { IToken } from '@features/auth/interfaces/token.interface';
import { AuthApiService } from '../auth-api/auth-api.service';
import { AuthStateService } from '../auth-state/auth-state.service';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
export class AuthFacadeService {

    public get token(): IToken | undefined {
        return this._authState.loadToken();
    }

    public constructor(
        private readonly _authApi: AuthApiService,
        private readonly _authState: AuthStateService,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute,
    ) { }

    public signInWithUsernameAndPassword(username: string, password: string): void {
        this._authApi.signInWithUsernameAndPassword(username, password).subscribe((token) => {
            this.signInWithToken(token);
        });
    }

    public signInWithToken(token: IToken): void {
        const returnUrl = this._route.snapshot.queryParams.returnUrl;
        this._authState.saveToken(token);

        if (returnUrl !== undefined && returnUrl !== null) {
            this._router.navigateByUrl(returnUrl);
        } else {
            this._router.navigate(['/dashboard']);
        }
    }

    public signOut(): void {
        this._authApi.signOut().subscribe(() => {
            localStorage.clear();
            this._router.navigate(['/sign-in']);
        });
    }
}
