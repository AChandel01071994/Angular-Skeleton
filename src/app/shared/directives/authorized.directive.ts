import { Directive, Input, ElementRef } from '@angular/core';
import { GlobalService } from '@app/core/services/global.service';
import { AuthService } from '@app/core/services/auth.service';

@Directive({
    selector: '[authorized]',
})
export class AuthDirective {

    @Input() authorized: number[];

    constructor(
        private element: ElementRef,
        private globalService: GlobalService
    ) {
        let isAuthorized = this.authorized.includes(this.globalService.currrentUser.role);
        if (!isAuthorized) this.globalService.renderer.setStyle(this.element, 'display', 'none');
    }


}