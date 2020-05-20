import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grad } from '../models/grad.model';
import { Observable } from 'rxjs';
import { Adresa } from '../models/adresa.model';
import { Ulica } from '../models/ulica.model';

@Injectable({
  providedIn: 'root',
})
export class AdresaService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public vratiSveGradove(): Observable<Grad[]> {
    return this.http.get<Grad[]>(`${this.baseUrl}/grad/svi`);
  }

  public vratiSveUlice(postanskiBroj: number): Observable<Ulica[]> {
    return this.http.get<Ulica[]>(`${this.baseUrl}/ulica/${postanskiBroj}`);
  }

  public vratiSveAdrese(
    postanskiBroj: number,
    sifraUlice: string
  ): Observable<Adresa[]> {
    return this.http.get<Adresa[]>(
      `${this.baseUrl}/adresa/${postanskiBroj}/${sifraUlice}`
    );
  }
}
