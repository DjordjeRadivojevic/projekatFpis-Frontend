import { Injectable } from '@angular/core';
import { Kupac } from '../models/kupac.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Zaposleni } from '../models/zaposleni.model';

@Injectable({
  providedIn: 'root',
})
export class KupacService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public vratiSveKupce(): Observable<Kupac[]> {
    return this.http.get<Kupac[]>(`${this.baseUrl}/kupac/svi`);
  }
  public vratiKupca(id: string): Observable<Kupac> {
    return this.http.get<Kupac>(`${this.baseUrl}/kupac/${id}`);
  }
  public zapamtiKupca(kupac: Kupac) {
    return this.http.post<Kupac>(`${this.baseUrl}/kupac/zapamti`, kupac);
  }

  public izmeniKupca(kupac: Kupac) {
    return this.http.put<Kupac>(`${this.baseUrl}/kupac/izmeni`, kupac);
  }

  public izbrisiKupca(id: string) {
    return this.http.delete(`${this.baseUrl}/kupac/izbrisi/${id}`);
  }
  public pronadjiKupce(nazivKupca: string): Observable<Kupac[]> {
    return this.http.get<Kupac[]>(
      `${this.baseUrl}/kupac/pronadji/${nazivKupca}`
    );
  }
  public vratiSveZaposlene(): Observable<Zaposleni[]> {
    return this.http.get<Zaposleni[]>(`${this.baseUrl}/zaposleni/svi`);
  }
}
