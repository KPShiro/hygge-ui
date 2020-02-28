import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SharedFacade } from '@modules/shared/shared.facade';
import { SnackbarService } from '@modules/snackbar/services/snackbar.service';

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
                    // let errorMessage = '';

                    // if (response.error instanceof ErrorEvent) {
                    //     // client-side error
                    //     errorMessage = `Error: ${response.error.message}`;
                    // } else {
                    //     // server-side error
                    //     errorMessage = `Error Code: ${response.status}\nMessage: ${response.message}`;
                    // }

                    this.snackbar.open(response.message);
                    
                    if (response.status === 401) {
                        this.router.navigate(['/sign-in']);
                    }

                    return throwError(response);
                }),
                finalize(() => this.sharedFacade.setIsProcessing(false)),
            );
    }
}