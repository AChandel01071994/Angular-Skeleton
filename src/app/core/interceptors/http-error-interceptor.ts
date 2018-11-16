
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor( 
        private errorHandlerService: ErrorHandlerService, 
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                // handle no network
                if (!navigator.onLine) {
                    // this.toasterService.noInternetConnection();
                    this.router.navigate(['/error'], { queryParams: { errorMessage: 'no internet error', errorCode: 0, tryAgainUrl: this.router.url } });
                }
                else {
                    // handle unexpected XHR errors
                    this.errorHandlerService.logError('http-interceptor-response-error', error);
                    // this.toasterService.somethingFailedError(); 
                    this.router.navigate(['/error'], { queryParams: { tryAgainUrl: this.router.url } });
                }
                return throwError(error);
            })
        )
    }
}