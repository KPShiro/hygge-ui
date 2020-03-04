import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedFacade } from '@modules/shared/shared.facade';
import { SnackbarService } from '@modules/snackbar/services/snackbar.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';


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
                    this.snackbar.open(response.error.message);

                    if (response.status === 401) {
                        this.router.navigate(['/sign-in']);
                    }

                    return EMPTY;
                }),
                finalize(() => this.sharedFacade.setIsProcessing(false)),
            );
    }
}
