import { Component, Renderer2 } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Spinkit } from 'ng-http-loader';
import { ToasterService, AlertService, StorageService, GlobalService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  spinkit = Spinkit.skThreeBounce;
  constructor(
    private translateService: TranslateService,
    private alertService: AlertService,
    private storageService: StorageService,
    private globalService: GlobalService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    // check local storage and set current language

    this.translateService.setDefaultLang(this.globalService.currentLanguage);

    // test 
    // this.alertService.showAlert('hi angular', ['yes', 'no'])

    // set local storage on language change
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.storageService.set(this.storageService.key.language, event.lang);
      // reload browser
      location.reload();
    });
    // set renderer
    this.globalService.renderer = this.renderer;
  }


}
