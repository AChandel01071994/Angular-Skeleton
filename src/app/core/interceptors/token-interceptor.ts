
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { StorageService } from '../services/storage.sevice';
import { concatMap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { ApiProviderService } from '../services/api-provider.service';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  token: string;
  constructor(
    private storageService: StorageService,
    private apiProvider: ApiProviderService
  ) {

  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestCopy = request;
    return of(this.storageService.getToken())
      .pipe(
        concatMap(token => {
          if (!request.url.includes(this.apiProvider.endPoints.token)) {
            requestCopy = request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            })
          }
          return next.handle(requestCopy)
        })
      )

  }
}
