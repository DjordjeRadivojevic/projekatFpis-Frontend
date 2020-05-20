import { Faktura } from './faktura.model';
import { Proizvod } from './proizvod.model';
import { Status } from './status.enum';

export class StavkaFakture {
  brojSF?: number;
  opis?: string;
  ean?: number;
  kolicina?: number;
  faktura?: Faktura;
  proizvod?: Proizvod;
  status?: Status;
}
