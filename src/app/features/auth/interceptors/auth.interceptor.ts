import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthFacadeService } from '../services/auth-facade/auth-facade.service';
import { flatMap, first } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    public constructor(
        private readonly _authFacade: AuthFacadeService,
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this._authFacade.token$.pipe(
            first(),
            flatMap((token) => {
                if (token !== undefined && token !== null) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token.accessToken}`,
                        },
                    });
                }

                return next.handle(request);
            }),
        );
    }
}
