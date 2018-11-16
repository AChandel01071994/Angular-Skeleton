

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, ErrorComponent } from './core';

const routes: Routes = [
    // use authorization guard for coins
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'error', component: ErrorComponent },
    { path: '**', component: ErrorComponent, data: { notFound: '404 Page Not Found' } }
    // { path: '**', redirectTo: 'error', pathMatch : 'full', data: { notFound: '404 Page Not Found' } }
    // {path :'coins', loadChildren : '../../coin/coin.module#CoinModule'}
    // {path : 'login', component : LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }


