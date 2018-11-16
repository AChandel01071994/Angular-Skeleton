import { Injectable } from '@angular/core';
import { ToasterService } from './toaster.service';
import { ResponseEnvelope } from '../models/response-envelope';
import { throwError } from "rxjs";
import { HttpErrorResponse } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import * as StackTraceParser from 'error-stack-parser';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { StorageService } from './storage.sevice';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {

    constructor(
        private toasterService: ToasterService,
        private locationStrategy: LocationStrategy,
        private router: Router,
        private globalService: GlobalService,
        private storageService: StorageService
    ) { }


    logError(context, error) {
        console.error('custom-error-logging | ', context, error);
        // Send error to server
        const errorToSend = this.addContextInfo(error);
        console.log({ errorToSend })
        //TODO: send errorToSend to server
    }

    showCustomErrorToaster(err: string) {
        this.toasterService.showErrorToaster('Attention', err);
    }
    addContextInfo(error) {
        // All the context details 
        const name = error.name || null;
        const appId = 'Stari-Web';
        const user = this.globalService.currrentUser.email || 'anonymous';
        const time = new Date().getTime();
        const logId = `${appId}-${user}-${time}`;
        const location = this.locationStrategy;
        const url = location instanceof PathLocationStrategy ? location.path() : '';
        const status = error.status || null;
        const message = error.message || error.toString();
        const stack = error instanceof HttpErrorResponse ? null : StackTraceParser.parse(error);
        const errorToSend = { name, appId, user, time, logId, url, status, message, stack };
        return errorToSend;
    }

    handleExpectedErrors = (response: ResponseEnvelope) => {

        if (response.statusCode != 200 && !response.isError) {
            // take action on expected user generated errors
            if (response.statusCode == 401) {
                this.storageService.removeToken();
                //TODO: Redirect to login
                throw new Error(response.message);
            } else {
                // show toaster for expected user generated errors
                this.showCustomErrorToaster(response.message);
                throw new Error(response.message);

            }
        } else if (response.isError) {
            //  log and redirect to error page in case of server side exceptions
            const err = new Error(response.responseException.exceptionMessage);
            err.stack = response.responseException.details;
            this.logError('server-side-exception', err);
            this.router.navigate(['/error'], { queryParams: { tryAgainUrl: this.router.url } });
            throw new Error(response.responseException.exceptionMessage);
        }
        else
            return response.result;
    }
}
