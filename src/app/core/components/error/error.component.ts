import { Component, OnInit, ElementRef } from '@angular/core';
import { GlobalService } from '@app/core/services/global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  tryAgainUrl = '/home';
  errorMessage = 'Something failed. Please Try Again!'
  notFound: string;
  constructor(
    private globalService: GlobalService,
    private element: ElementRef,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {

     this.activateRoute.data.subscribe(p => {
       this.notFound = p.notFound
      });
    this.activateRoute.queryParams.subscribe(params => {
      this.errorMessage = params['errorMessage'] || this.errorMessage;
      // redirect to home if error comes on error page
      this.tryAgainUrl = (<string>params['tryAgainUrl']) ? (<string>params['tryAgainUrl']).includes('error') ? '/home' : params['tryAgainUrl'] : this.tryAgainUrl;
    })
    // set direction class on host element
    this.globalService.setDirectionClass(this.element);
  }

}
