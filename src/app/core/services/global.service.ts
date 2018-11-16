import { Injectable, ElementRef, Renderer2 } from '@angular/core';
import { StorageService } from './storage.sevice';
import { Languages, DEFAULT_LANGUAGE, DeviceTypes } from '@config/config';
import { User } from '../models/user';

declare const InstallTrigger: any;

@Injectable({ providedIn: 'root' })
export class GlobalService {
    languages = Languages;
    defaultLanguage = DEFAULT_LANGUAGE;
    renderer: Renderer2;
    deviceTypes = DeviceTypes;
    constructor(
        private storageService: StorageService
    ) { }

    get currentLanguage(): string {
        let currentLanguage = this.storageService.get(this.storageService.key.language);
        return this.languages
            .find(lang => lang.ISO == currentLanguage) ? currentLanguage : this.defaultLanguage;
    }

    get appDirection() {
        return this.languages
            .find(lang => lang.ISO == this.currentLanguage).direction;
    }

    get currrentUser(): User {
        return <User>JSON.parse(localStorage.getItem(this.storageService.key.user));
    }

    setDirectionClass(element: ElementRef) {
        const directionClass = this.appDirection == 'rtl' ? 'direction_rtl' : 'direction_ltr';
        this.renderer.addClass(element.nativeElement, directionClass);
    }

    uuid() {
        return (<any>[1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        )
    }

    browserName(): string {
        // Opera 8.0+
        let isOpera = (!!window['opr'] && !!window['opr'].addons) || !!window['opera'] || navigator.userAgent.indexOf(' OPR/') >= 0;

        // Firefox 1.0+
        let isFirefox = typeof InstallTrigger !== 'undefined';

        // Safari 3.0+ "[object HTMLElementConstructor]" 
        let isSafari = /constructor/i.test(window['HTMLElement']) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof window['safari'] !== 'undefined' && window['safari'].pushNotification));

        // Internet Explorer 6-11
        let isIE = /*@cc_on!@*/false || !!document['documentMode'];

        // Edge 20+
        let isEdge = !isIE && !!window['StyleMedia'];

        // Chrome 1+
        let isChrome = !!window['chrome'] && !!window['chrome'].webstore;

        return isChrome ? 'GoogleChrome' : isFirefox ? 'MozillaFirefox' : isEdge ? 'MicrosoftEdge' : isSafari ? 'Safari' : isOpera ? 'Opera' : 'UnknownBrowser';
    }

    browserId(): number {
        return this.deviceTypes.find(device => device.key == this.browserName()).value;
    }
}