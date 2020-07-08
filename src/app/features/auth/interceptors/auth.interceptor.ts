import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthFacadeService } from '../services/auth-facade/auth-facade.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    public constructor(
        private readonly _authFacade: AuthFacadeService,
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this._authFacade.token;

        if (token !== undefined && token !== null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token.accessToken}`,
                },
            });
        }

        return next.handle(request);
    }
}
