import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { KupacComponent } from './kupac/kupac.component';
import { KupacService } from './services/kupac.service';
import { KupacNoviComponent } from './kupac/kupac-novi/kupac-novi.component';
import { AdresaService } from './services/adresa.service';
import { KupacPretragaComponent } from './kupac/kupac-pretraga/kupac-pretraga.component';
import { KupacPrikaziComponent } from './kupac/kupac-pretraga/kupac-prikazi/kupac-prikazi.component';
import { KupacIzmeniComponent } from './kupac/kupac-pretraga/kupac-izmeni/kupac-izmeni.component';
import { FakturaComponent } from './faktura/faktura.component';
import { FakturaService } from './services/faktura.service';
import { FakturaNoviComponent } from './faktura/faktura-novi/faktura-novi.component';
import { FakturaPretragaComponent } from './faktura/faktura-pretraga/faktura-pretraga.component';
import { FakturaIzmeniComponent } from './faktura/faktura-pretraga/faktura-izmeni/faktura-izmeni.component';
import { FakturaPrikaziComponent } from './faktura/faktura-pretraga/faktura-prikazi/faktura-prikazi.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    KupacComponent,
    KupacNoviComponent,
    KupacPretragaComponent,
    KupacPrikaziComponent,
    KupacIzmeniComponent,
    FakturaComponent,
    FakturaNoviComponent,
    FakturaPretragaComponent,
    FakturaIzmeniComponent,
    FakturaPrikaziComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [KupacService, AdresaService, FakturaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
