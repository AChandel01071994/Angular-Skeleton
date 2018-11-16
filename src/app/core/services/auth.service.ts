import { Injectable } from '@angular/core';
import { User, TokenHeaders } from '../models/user';
import { StorageService } from './storage.sevice';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { HttpService } from './http.service';
import { GlobalService } from './global.service';

@Injectable({ providedIn: 'root' })

export class AuthService {

    constructor(
        private storageService: StorageService,
        private httpService: HttpService,
        private globalService: GlobalService
    ) { }

    get isAuthenticated(): boolean {
        return this.storageService.getToken() && moment(this.globalService.currrentUser.expiration)
            .isAfter();
    }

    getToken(tokenHeaders: TokenHeaders) {
        return this.httpService.getToken(tokenHeaders)
            .pipe(tap(this.saveUserAndTokenInfo))
    }

    saveUserAndTokenInfo = (user: User) => {  
        this.storageService.setToken(user.access_token);
        this.storageService.setUser(user);
    }
}