import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinsComponent } from '@app/coin/coins/coins.component';

const routes: Routes = [
  { path: '', redirectTo: 'coins', pathMatch: 'full' },
  { path: 'coins', component: CoinsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinRoutingModule { }
