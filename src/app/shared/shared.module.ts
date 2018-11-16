import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslationLoader } from '@app/core/services/translate-loader.service';
import { AuthDirective } from './directives/authorized.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { TestDialogComponent } from './components/test-dialog/test-dialog.component';
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpService } from '@app/core/services/http.service';

export function HttpLoaderFactory(httpService: HttpService) {
  return new TranslationLoader(httpService);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpService]
      }
    }),
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  declarations: [
    AuthDirective,
    TestDialogComponent
  ],
  entryComponents: [
    TestDialogComponent
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    AuthDirective,
    MatDialogModule,
    TestDialogComponent,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class SharedModule { }
