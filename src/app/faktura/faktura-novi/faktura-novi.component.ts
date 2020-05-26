import { Component, OnInit } from '@angular/core';
import { FakturaService } from 'src/app/services/faktura.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdresaService } from 'src/app/services/adresa.service';
import { Router } from '@angular/router';
import { Grad } from 'src/app/models/grad.model';
import { Ulica } from 'src/app/models/ulica.model';
import { Adresa } from 'src/app/models/adresa.model';
import { Zaposleni } from 'src/app/models/zaposleni.model';
import { NacinIsporuke } from 'src/app/models/nacinIsporuke.model';
import { NacinPlacanja } from 'src/app/models/nacinPlacanja.model';
import { StavkaFakture } from 'src/app/models/stavkaFakture.model';
import { Faktura } from 'src/app/models/faktura.model';
import { Stanje } from 'src/app/models/stanje.enum';
import { Status } from 'src/app/models/status.enum';
import { Proizvod } from 'src/app/models/proizvod.model';
import { fadeAnimation } from 'src/app/animations';

@Component({
  selector: 'app-faktura-novi',
  templateUrl: './faktura-novi.component.html',
  styleUrls: ['./faktura-novi.component.css'],
  animations: [fadeAnimation],
})
export class FakturaNoviComponent implements OnInit {
  fakturaForma: FormGroup;
  stavkaFaktureForma: FormGroup;
  stavkeFakture: StavkaFakture[] = [];
  naciniIsporuke: NacinIsporuke[];
  naciniPlacanja: NacinPlacanja[];
  proizvodi: Proizvod[];
  gradovi: Grad[] = [];
  ulice: Ulica[] = [];
  brojevi: Adresa[] = [];
  zaposleniLista: Zaposleni[] = [];
  prikazPorukeFakturaError: boolean = false;
  prikazPorukeStavkaError: boolean = false;
  prikazPorukeMinimumStavkeError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private fakturaService: FakturaService,
    private adresaService: AdresaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.kreirajFakturaForma();
    this.kreirajStavkaFaktureForma();
    this.fakturaService
      .vratiSveNacineIsporuka()
      .subscribe((data: NacinIsporuke[]) => {
        this.naciniIsporuke = data;
      });
    this.fakturaService
      .vratiSveNacinePlacanja()
      .subscribe((data: NacinPlacanja[]) => {
        this.naciniPlacanja = data;
      });
    this.fakturaService.vratiSveProizvode().subscribe((data: Proizvod[]) => {
      this.proizvodi = data;
    });
    this.adresaService.vratiSveGradove().subscribe((data: Grad[]) => {
      this.gradovi = data;
    });
    this.fakturaService.vratiSveZaposlene().subscribe((data: Zaposleni[]) => {
      this.zaposleniLista = data;
    });
  }

  kreirajFakturaForma() {
    this.fakturaForma = this.formBuilder.group({
      sifraFakture: [''],
      datumPrometa: [''],
      valuta: [''],
      nacinIsporuke: [''],
      nacinPlacanja: [''],
      zaposleni: [''],
      grad: [''],
      ulica: [{ value: '', disabled: true }],
      broj: [{ value: '', disabled: true }],
    });
  }

  kreirajStavkaFaktureForma() {
    this.stavkaFaktureForma = this.formBuilder.group({
      brojSF: [''],
      opis: [''],
      ean: [''],
      kolicina: [''],
      proizvod: [''],
      // setovanje fakture za stavku radim na bekendu
    });
  }

  zapamtiStavkuFakture() {
    this.stavkaFaktureForma.controls['brojSF'].setValidators(
      Validators.required
    );
    this.stavkaFaktureForma.controls['brojSF'].updateValueAndValidity();
    this.stavkaFaktureForma.controls['opis'].setValidators(Validators.required);
    this.stavkaFaktureForma.controls['opis'].updateValueAndValidity();
    this.stavkaFaktureForma.controls['ean'].setValidators(Validators.required);
    this.stavkaFaktureForma.controls['ean'].updateValueAndValidity();
    this.stavkaFaktureForma.controls['kolicina'].setValidators(
      Validators.required
    );
    this.stavkaFaktureForma.controls['kolicina'].updateValueAndValidity();
    this.stavkaFaktureForma.controls['proizvod'].setValidators(
      Validators.required
    );
    this.stavkaFaktureForma.controls['proizvod'].updateValueAndValidity();

    let nemaTakveStavke: boolean =
      this.stavkeFakture.filter(
        (s) => s.brojSF == this.stavkaFaktureForma.get('brojSF').value
      ).length < 1;
    if (this.stavkaFaktureForma.valid && nemaTakveStavke) {
      let stavka: StavkaFakture = {
        brojSF: this.stavkaFaktureForma.get('brojSF').value,
        opis: this.stavkaFaktureForma.get('opis').value,
        ean: this.stavkaFaktureForma.get('ean').value,
        kolicina: this.stavkaFaktureForma.get('kolicina').value,
        proizvod: {
          sifraproizvoda: this.stavkaFaktureForma.get('proizvod').value,
          nazivProizvoda: this.proizvodi.find(
            (p) =>
              p.sifraproizvoda === this.stavkaFaktureForma.get('proizvod').value
          ).nazivProizvoda,
        },
        status: Status.INSERT,
      };
      this.stavkeFakture.push(stavka);
      this.proizvodi = this.proizvodi.filter(
        (x) => x.sifraproizvoda !== stavka.proizvod.sifraproizvoda
      );
      this.stavkaFaktureForma.reset();
      this.stavkaFaktureForma.get('proizvod').setValue('');
      if (this.proizvodi.length === 0) {
        this.stavkaFaktureForma.disable();
      }
      this.prikazPorukeStavkaError = false;
      this.prikazPorukeMinimumStavkeError = false;
    } else {
      this.prikazPorukeStavkaError = true;
    }
  }

  zapamtiFakturu() {
    this.fakturaForma.controls['sifraFakture'].setValidators(
      Validators.required
    );
    this.fakturaForma.controls['sifraFakture'].updateValueAndValidity();
    this.fakturaForma.controls['datumPrometa'].setValidators(
      Validators.required
    );
    this.fakturaForma.controls['datumPrometa'].updateValueAndValidity();
    this.fakturaForma.controls['valuta'].setValidators(Validators.required);
    this.fakturaForma.controls['valuta'].updateValueAndValidity();
    this.fakturaForma.controls['nacinIsporuke'].setValidators(
      Validators.required
    );
    this.fakturaForma.controls['nacinIsporuke'].updateValueAndValidity();
    this.fakturaForma.controls['nacinPlacanja'].setValidators(
      Validators.required
    );
    this.fakturaForma.controls['nacinPlacanja'].updateValueAndValidity();
    this.fakturaForma.controls['zaposleni'].setValidators(Validators.required);
    this.fakturaForma.controls['zaposleni'].updateValueAndValidity();
    this.fakturaForma.controls['grad'].setValidators(Validators.required);
    this.fakturaForma.controls['grad'].updateValueAndValidity();
    this.fakturaForma.controls['ulica'].setValidators(Validators.required);
    this.fakturaForma.controls['ulica'].updateValueAndValidity();
    this.fakturaForma.controls['broj'].setValidators(Validators.required);
    this.fakturaForma.controls['broj'].updateValueAndValidity();

    if (this.fakturaForma.valid && this.stavkeFakture.length > 0) {
      const faktura: Faktura = {
        sifraFakture: this.fakturaForma.get('sifraFakture').value,
        datumPrometa: this.fakturaForma.get('datumPrometa').value,
        valuta: this.fakturaForma.get('valuta').value,
        stanje: Stanje.POPUNJENA,
        nacinIsporuke: {
          niID: this.fakturaForma.get('nacinIsporuke').value,
        },
        nacinPlacanja: {
          npID: this.fakturaForma.get('nacinPlacanja').value,
        },
        zaposleni: {
          jmbg: this.fakturaForma.get('zaposleni').value,
        },
        adresa: {
          adresaID: this.fakturaForma.get('broj').value,
          ulica: {
            sifraUlice: this.fakturaForma.get('ulica').value,
            grad: {
              postanskiBroj: this.fakturaForma.get('grad').value,
            },
          },
        },
        stavkeFakture: this.stavkeFakture,
      };

      this.fakturaService.zapamtiFakturu(faktura).subscribe((data: Faktura) => {
        this.navigateFaktureLista();
        this.prikazPorukeFakturaError = false;
      });
    } else {
      this.prikazPorukeFakturaError = true;
      if (this.stavkeFakture.length < 1) {
        this.prikazPorukeMinimumStavkeError = true;
      }
    }
  }

  navigateFaktureLista() {
    this.router.navigateByUrl('fakture-svi');
  }

  vratiUlice(postanskiBroj: number) {
    this.fakturaForma.get('ulica').setValue('');
    this.fakturaForma.get('broj').setValue('');
    this.fakturaForma.get('ulica').enable();
    this.fakturaForma.get('broj').disable();
    this.adresaService
      .vratiSveUlice(postanskiBroj)
      .subscribe((data: Ulica[]) => {
        this.ulice = data;
      });
  }

  vratiAdrese(postanskiBroj: number, sifraUlice: string) {
    this.fakturaForma.get('broj').setValue('');
    this.fakturaForma.get('broj').enable();
    this.adresaService
      .vratiSveAdrese(postanskiBroj, sifraUlice)
      .subscribe((data: Adresa[]) => {
        this.brojevi = data;
      });
  }
}
