import { Injectable } from '@angular/core';
import swal from 'sweetalert';

@Injectable({ providedIn: 'root' })
export class AlertService {

    constructor() { }

    showAlert(message, btns: string[]) { 
        swal(message, {
            buttons: btns
        });
    }

}