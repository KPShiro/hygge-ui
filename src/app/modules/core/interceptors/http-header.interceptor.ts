import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { UserFacade } from '@modules/user/services/user-facade/user-facade.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { IToken } from '@modules/user/interfaces/token.interface';


@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

    public constructor(
        private readonly _userFacade: UserFacade,
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: IToken | null = this._userFacade.token;

        if (!isNullOrUndefined(token)) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token.accessToken}`,
                },
            });
        }

        return next.handle(request);
    }
}
