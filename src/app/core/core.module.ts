import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from '@app/core/core-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '@app/shared'; 
import { API } from '@config/config'; 
import { END_POINTS } from './services/api-provider.service';
import { ErrorComponent } from './components/error/error.component';


@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ],
  declarations: [HomeComponent, ErrorComponent],
  providers :[
    { provide: END_POINTS, useValue: API, multi: true },
  ]
})
export class CoreModule { }
