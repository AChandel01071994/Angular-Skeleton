import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiProviderService } from './api-provider.service';
import { map, reduce } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User, TokenHeaders } from '../models/user';
import { ErrorHandlerService } from './error-handler.service';
import { ResponseEnvelope } from '../models/response-envelope';
import { Languages } from '@config/config';
import { Translation } from '../models/translation';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  languages = Languages;
  constructor(
    private httpClient: HttpClient,
    private apiProvider: ApiProviderService,
    private errorHandlerService: ErrorHandlerService,
    private globalService: GlobalService
  ) { }

  getToken(tokenHeaders: TokenHeaders): Observable<User> {
    const headers = new HttpHeaders()
      .set('username', tokenHeaders.username)
      .set('password', tokenHeaders.password)
      .set('deviceId', this.globalService.uuid())
      .set('deviceType', this.globalService.browserId().toString());
    return this.httpClient
      .get<ResponseEnvelope>(this.apiProvider.resolve(this.apiProvider.endPoints.token), { headers: headers })
      .pipe(map(this.errorHandlerService.handleExpectedErrors));
  }

  getTranslations(lang: string) {
    let langId = this.languages.find(val => val.ISO == lang).id;
    return this.httpClient.get<ResponseEnvelope>(this.apiProvider.resolve(this.apiProvider.endPoints.translations, { lang: langId }, true))
      .pipe(
        map(this.errorHandlerService.handleExpectedErrors),
        map(translations => {
          return translations.reduce((prev, next) => {
            prev[next.key] = next.value;
            return prev;
          }, {})
        })
      );
  }

}
