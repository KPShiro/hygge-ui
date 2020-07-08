import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SnackbarService } from '@features/snackbar/services/snackbar.service';
import { SnackbarType } from '@features/snackbar/enums/snackbar-type.enum';
import { AuthApiService } from '@features/auth/services/auth-api/auth-api.service';
import { IToken } from '@features/auth/interfaces/token.interface';
import { AuthFacadeService } from '@features/auth/services/auth-facade/auth-facade.service';
import { AuthStateService } from '@features/auth/services/auth-state/auth-state.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    private isRefreshing: boolean = false;
    private refreshTokenSubject: BehaviorSubject<IToken> = new BehaviorSubject<IToken>(null);

    public constructor(
        private readonly _snackbar: SnackbarService,
        private readonly _authApi: AuthApiService,
        private readonly _authStateService: AuthStateService,
        private readonly _authFacade: AuthFacadeService,
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((response: HttpErrorResponse) => {
                    if (response.status === 0) {
                        this._snackbar.open('Our services might be temporarily unavailable... Please come back later and try again.', SnackbarType.ERROR);
                    }

                    if (response.status === 401) {
                        return this.handle401Error(request, next);
                    }

                    if (response.status === 500) {
                        this._snackbar.open('Oops something went wrong... Please contact support: (+48) 123 456 789', SnackbarType.ERROR);
                    }

                    return throwError(response);
                }),
            );
    }

    private addToken(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this._authApi.refreshToken(this._authFacade.token.refreshToken).pipe(
                switchMap((newToken) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(newToken);

                    this._authStateService.saveToken(newToken);

                    return next.handle(this.addToken(request, newToken.accessToken));
                })
            );

        } else {
            return this.refreshTokenSubject.pipe(
                filter((token) => token != null),
                take(1),
                switchMap((token) => next.handle(this.addToken(request, token.accessToken))));
        }
    }
}
