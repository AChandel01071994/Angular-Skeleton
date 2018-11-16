import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToasterService {

    constructor(
        private toastr: ToastrService,
        public snackBar: MatSnackBar
    ) {

    }

    showSuccessToaster(label: string, message: string) {
        this.toastr.success(message, label);
    }

    showErrorToaster(label: string, message: string) {
        this.toastr.error(message, label);
    }

    accessDeniedError() {
        this.toastr.error('unauthorized user', 'Access Denied');
    }

    somethingFailedError() {
        this.toastr.error('Please try again', 'Something failed !!');
    }

    noInternetConnection(){
        this.toastr.error('No Internet Connection', 'Something failed !!');

    }

    showMatToaster(message: string, action: string, duration: number) {
        this.snackBar.open(message, action, {
            duration: duration
        });
    }
}