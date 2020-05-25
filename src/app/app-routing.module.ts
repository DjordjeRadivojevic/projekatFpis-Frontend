import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KupacComponent } from './kupac/kupac.component';
import { KupacNoviComponent } from './kupac/kupac-novi/kupac-novi.component';
import { KupacPretragaComponent } from './kupac/kupac-pretraga/kupac-pretraga.component';
import { KupacIzmeniComponent } from './kupac/kupac-pretraga/kupac-izmeni/kupac-izmeni.component';
import { KupacPrikaziComponent } from './kupac/kupac-pretraga/kupac-prikazi/kupac-prikazi.component';
import { FakturaComponent } from './faktura/faktura.component';
import { FakturaNoviComponent } from './faktura/faktura-novi/faktura-novi.component';
import { FakturaPretragaComponent } from './faktura/faktura-pretraga/faktura-pretraga.component';
import { FakturaPrikaziComponent } from './faktura/faktura-pretraga/faktura-prikazi/faktura-prikazi.component';
import { FakturaIzmeniComponent } from './faktura/faktura-pretraga/faktura-izmeni/faktura-izmeni.component';

const routes: Routes = [
  { path: '', component: KupacComponent },
  { path: 'kupac-svi', component: KupacComponent },
  { path: 'kupac-novi', component: KupacNoviComponent },
  { path: 'kupac-pretraga', component: KupacPretragaComponent },
  { path: 'kupac-izmeni/:pib', component: KupacIzmeniComponent },
  { path: 'kupac-prikazi/:pib', component: KupacPrikaziComponent },
  { path: 'fakture-svi', component: FakturaComponent },
  { path: 'faktura-novi', component: FakturaNoviComponent },
  { path: 'faktura-pretraga', component: FakturaPretragaComponent },
  { path: 'faktura-prikazi/:sifraFakture', component: FakturaPrikaziComponent },
  { path: 'faktura-izmeni/:sifraFakture', component: FakturaIzmeniComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
