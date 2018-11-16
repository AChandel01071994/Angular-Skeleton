import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';


@Injectable({ providedIn: 'root' })

export class TranslationLoader implements TranslateLoader {
    constructor(
        private httpService: HttpService
    ) { }

    getTranslation(lang: string): Observable<any> {
        return this.httpService.getTranslations(lang);
    }
}