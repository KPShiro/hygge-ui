import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedFacade } from '@modules/shared/shared.facade';
import { SnackbarService } from '@modules/snackbar/services/snackbar.service';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SnackbarType } from '@modules/snackbar/enums/snackbar-type.enum';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    public constructor(
        private readonly sharedFacade: SharedFacade,
        private readonly router: Router,
        private readonly snackbar: SnackbarService,
    ) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.sharedFacade.setIsProcessing(true);

        return next.handle(request)
            .pipe(
                catchError((response: HttpErrorResponse) => {
                    if (response.status === 0) {
                        this.snackbar.open('Our services might be temporarily unavailable... Please come back later and try again.', SnackbarType.ERROR);
                        return EMPTY;
                    }

                    if (response.status === 401) {
                        this.router.navigate(['/sign-in']);
                        return EMPTY;
                    }

                    if (response.status === 500) {
                        this.snackbar.open('Oops something went wrong... Please contact support: (+48) 123 456 789', SnackbarType.ERROR);
                        return EMPTY;
                    }

                    return throwError(response);
                }),
                finalize(() => this.sharedFacade.setIsProcessing(false)),
            );
    }
}
