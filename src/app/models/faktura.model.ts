import { NacinIsporuke } from './nacinIsporuke.model';
import { NacinPlacanja } from './nacinPlacanja.model';
import { Zaposleni } from './zaposleni.model';
import { Adresa } from './adresa.model';
import { StavkaFakture } from './stavkaFakture.model';
import { Stanje } from './stanje.enum';

export class Faktura {
  sifraFakture?: string;
  datumPrometa?: Date | string;
  valuta?: Date | string;
  stanje?: Stanje;
  nacinIsporuke?: NacinIsporuke;
  nacinPlacanja?: NacinPlacanja;
  zaposleni?: Zaposleni;
  adresa?: Adresa;
  stavkeFakture?: StavkaFakture[];
}
