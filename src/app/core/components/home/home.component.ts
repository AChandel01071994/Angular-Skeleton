import { Component, OnInit, ElementRef, Inject, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToasterService } from '@app/core/services/toaster.service';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '@app/core/services/global.service';
import { AuthService } from '@app/core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TestDialogComponent } from '@app/shared/components/test-dialog/test-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user = {
    name: 'abhishek',
    company: 'TFT'
  }
  animal = 'abhishek';
  constructor(
    private httpClient: HttpClient,
    private toasterService: ToasterService,
    private translateService: TranslateService,
    private globalService: GlobalService,
    private element: ElementRef,
    private authService: AuthService,
    @Inject(LOCALE_ID) public locale: string,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // this.httpClient.get('http://localhost:5500/api/lateresponse').subscribe();

    // set direction class on host element
    this.globalService.setDirectionClass(this.element);

    console.log('this.locale', this.locale);
    const header = {
      username: 'kumar.sachin@tftus.com',
      password: 'Tftus@123'
    }
    // this.authService.getToken(header).subscribe();
    this.authService.getToken(header)
      .subscribe();
  }

  onClick() {
    this.toasterService.showMatToaster('sdsds', 'sdsdsdsd', 2000);
    this.translateService.use(this.globalService.languages.Spanish.ISO);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TestDialogComponent, {
      width: '250px',
      data: { animal: this.animal }
    });
  }

  openSnackBar() {
    this.snackBar.open('message', 'action', {
      duration: 2000,

    });
  }
} 
