import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthFacade } from '@modules/auth/auth.facade';
import { isNullOrUndefined } from 'util';


@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

    public constructor(
        private readonly authFacade: AuthFacade,
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string | null = this.authFacade.getAuthTokenValue();

        if (!isNullOrUndefined(token)) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`,
                },
            });
        }

        return next.handle(request);
    }
}