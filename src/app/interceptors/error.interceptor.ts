import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '@features/snackbar/services/snackbar.service';
import { SnackbarType } from '@features/snackbar/enums/snackbar-type.enum';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    public constructor(
        private readonly router: Router,
        private readonly snackbar: SnackbarService,
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((response: HttpErrorResponse) => {
                    if (response.status === 0) {
                        this.snackbar.open('Our services might be temporarily unavailable... Please come back later and try again.', SnackbarType.ERROR);
                    }

                    if (response.status === 401) {
                        this.router.navigate(['/sign-in']);
                    }

                    if (response.status === 500) {
                        this.snackbar.open('Oops something went wrong... Please contact support: (+48) 123 456 789', SnackbarType.ERROR);
                    }

                    return throwError(response);
                }),
            );
    }
}
