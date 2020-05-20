import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zaposleni } from '../models/zaposleni.model';
import { Proizvod } from '../models/proizvod.model';
import { NacinIsporuke } from '../models/nacinIsporuke.model';
import { NacinPlacanja } from '../models/nacinPlacanja.model';
import { Faktura } from '../models/faktura.model';

@Injectable({
  providedIn: 'root',
})
export class FakturaService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public vratiSveZaposlene(): Observable<Zaposleni[]> {
    return this.http.get<Zaposleni[]>(`${this.baseUrl}/zaposleni/svi`);
  }
  public vratiSveProizvode(): Observable<Proizvod[]> {
    return this.http.get<Proizvod[]>(`${this.baseUrl}/proizvod/svi`);
  }
  public vratiSveNacineIsporuka(): Observable<NacinIsporuke[]> {
    return this.http.get<NacinIsporuke[]>(`${this.baseUrl}/nacinIsporuke/svi`);
  }
  public vratiSveNacinePlacanja(): Observable<NacinPlacanja[]> {
    return this.http.get<NacinPlacanja[]>(`${this.baseUrl}/nacinPlacanja/svi`);
  }
  public vratiSveFakture(): Observable<Faktura[]> {
    return this.http.get<Faktura[]>(`${this.baseUrl}/faktura/svi`);
  }
  public vratiFakturu(sifraFakture: string): Observable<Faktura> {
    return this.http.get<Faktura>(`${this.baseUrl}/faktura/${sifraFakture}`);
  }
  public pronadjiFakture(datumPrometa: string): Observable<Faktura[]> {
    return this.http.get<Faktura[]>(
      `${this.baseUrl}/faktura/pronadji/${datumPrometa}`
    );
  }
  public zapamtiFakturu(faktura: Faktura) {
    return this.http.post<Faktura>(`${this.baseUrl}/faktura/zapamti`, faktura);
  }
  public izmeniFakturu(faktura: Faktura) {
    return this.http.put<Faktura>(`${this.baseUrl}/faktura/izmeni`, faktura);
  }
  public izbrisiFakturu(sifraFakture: string) {
    return this.http.delete(`${this.baseUrl}/faktura/izbrisi/${sifraFakture}`);
  }
}
