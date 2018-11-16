import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class StorageService {
    key = {
        language: 'language',
        token: 'token',
        user: 'user'
    }
    constructor() { }

    get(key: string) {
        return localStorage.getItem(key);
    }

    set(key: string, value: string) {
        return localStorage.setItem(key, value);
    }

    getToken() {
        return localStorage.getItem(this.key.token);
    }

    setToken(token) {
        localStorage.setItem(this.key.token, token);
    }

    removeToken() {
        localStorage.removeItem(this.key.token);
    }

    setUser(userInfo: User) {
        localStorage.setItem(this.key.user, JSON.stringify(userInfo));
    }
}