import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';  
import { ErrorHandlerService } from './error-handler.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private errorHandlerService : ErrorHandlerService
        //  private injector : Injector
    ) { }

    handleError(error: Error | HttpErrorResponse): void {
        // log/handle unexpected non http errors (unexpected http errors are logged/handled inside http-error-interceptor) 
        if (!(error instanceof HttpErrorResponse)) {
            // let errorHandlerService = this.injector.get(ErrorHandlerService)
            this.errorHandlerService.logError('global-error-handler-fallback | ', error);
        }

    }


}
