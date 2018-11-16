import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoinRoutingModule } from './coin-routing.module';
import { CoinsComponent } from './coins/coins.component';
import { SharedModule } from '@app/shared';  

@NgModule({
  imports: [
    CommonModule,
    CoinRoutingModule,
    SharedModule
  ],
  declarations: [CoinsComponent]
})
export class CoinModule { }
