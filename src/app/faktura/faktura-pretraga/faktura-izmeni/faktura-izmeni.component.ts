import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FakturaService } from 'src/app/services/faktura.service';
import { AdresaService } from 'src/app/services/adresa.service';
import { Faktura } from 'src/app/models/faktura.model';
import { Grad } from 'src/app/models/grad.model';
import { Ulica } from 'src/app/models/ulica.model';
import { Adresa } from 'src/app/models/adresa.model';
import { Zaposleni } from 'src/app/models/zaposleni.model';
import { NacinIsporuke } from 'src/app/models/nacinIsporuke.model';
import { NacinPlacanja } from 'src/app/models/nacinPlacanja.model';
import { Proizvod } from 'src/app/models/proizvod.model';
import { StavkaFakture } from 'src/app/models/stavkaFakture.model';
import { Status } from 'src/app/models/status.enum';
import { fadeAnimation } from 'src/app/animations';

@Component({
  selector: 'app-faktura-izmeni',
  templateUrl: './faktura-izmeni.component.html',
  styleUrls: ['./faktura-izmeni.component.css'],
  animations: [fadeAnimation],
})
export class FakturaIzmeniComponent implements OnInit {
  fakturaForma: FormGroup;
  stavkaFaktureForma: FormGroup;
  faktura: Faktura;
  gradovi: Grad[] = [];
  ulice: Ulica[] = [];
  brojevi: Adresa[] = [];
  zaposleniLista: Zaposleni[] = [];
  stavkeFakture: StavkaFakture[] = [];
  naciniIsporuke: NacinIsporuke[];
  naciniPlacanja: NacinPlacanja[];
  proizvodi: Proizvod[];
  selektovanaStavkaFaktura: StavkaFakture;
  prikazPorukeFakturaError: boolean = false;
  prikazPorukeStavkaError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fakturaService: FakturaService,
    private adresaService: AdresaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const sifraFakture = data['sifraFakture'];
      if (sifraFakture) {
        this.fakturaService
          .vratiFakturu(sifraFakture)
          .subscribe((data: Faktura) => {
            this.fakturaService
              .vratiSveZaposlene()
              .subscribe((data: Zaposleni[]) => {
                this.zaposleniLista = data;
              });
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
            this.fakturaService
              .vratiSveProizvode()
              .subscribe((data: Proizvod[]) => {
                this.proizvodi = data;
              });
            this.faktura = data;
            this.stavkeFakture = data.stavkeFakture;
            this.adresaService.vratiSveGradove().subscribe((data: Grad[]) => {
              this.gradovi = data;
            });
            this.adresaService
              .vratiSveUlice(this.faktura.adresa.ulica.grad.postanskiBroj)
              .subscribe((data: Ulica[]) => {
                this.ulice = data;
              });
            this.adresaService
              .vratiSveAdrese(
                this.faktura.adresa.ulica.grad.postanskiBroj,
                this.faktura.adresa.ulica.sifraUlice
              )
              .subscribe((data: Adresa[]) => {
                this.brojevi = data;
              });

            this.kreirajFakturaFormu();
            this.kreirajStavkaFaktureForma();
          });
      }
    });
  }

  kreirajFakturaFormu() {
    this.fakturaForma = this.formBuilder.group({
      sifraFakture: [
        {
          value: this.faktura ? this.faktura.sifraFakture : '',
          disabled: true,
        },
      ],
      datumPrometa: [this.faktura ? this.faktura.datumPrometa : ''],
      valuta: [this.faktura ? this.faktura.valuta : ''],
      stanje: [
        this.faktura
          ? this.faktura.stanje !== 'POPUNJENA'
            ? this.faktura.stanje
            : ''
          : '',
      ],
      nacinIsporuke: [this.faktura ? this.faktura.nacinIsporuke.niID : ''],
      nacinPlacanja: [this.faktura ? this.faktura.nacinPlacanja.npID : ''],
      zaposleni: [this.faktura ? this.faktura.zaposleni.jmbg : ''],
      grad: [this.faktura ? this.faktura.adresa.ulica.grad.postanskiBroj : ''],
      ulica: [this.faktura ? this.faktura.adresa.ulica.sifraUlice : ''],
      broj: [this.faktura ? this.faktura.adresa.adresaID : ''],
    });
  }

  kreirajStavkaFaktureForma() {
    this.stavkaFaktureForma = this.formBuilder.group({
      brojSF: [''],
      opis: [''],
      ean: [''],
      kolicina: [''],
      proizvod: [''],
    });
  }

  izmeniFakturu() {
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
    this.fakturaForma.controls['stanje'].setValidators(Validators.required);
    this.fakturaForma.controls['stanje'].updateValueAndValidity();

    if (this.fakturaForma.valid && this.stavkeFakture.length > 0) {
      const faktura: Faktura = {
        sifraFakture: this.fakturaForma.get('sifraFakture').value,
        datumPrometa: this.fakturaForma.get('datumPrometa').value,
        valuta: this.fakturaForma.get('valuta').value,
        stanje: this.fakturaForma.get('stanje').value,
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
      this.prikazPorukeFakturaError = false;

      this.fakturaService.izmeniFakturu(faktura).subscribe((data: Faktura) => {
        if (data) {
          this.vratiNaSveFakture();
        } else {
          this.prikazPorukeFakturaError = true;
        }
      });
    } else {
      this.prikazPorukeFakturaError = true;
    }
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
    console.log('ovo je niz stavki', this.stavkeFakture);
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
      // this.proizvodi = this.proizvodi.filter(
      //   (x) => x.sifraproizvoda !== stavka.proizvod.sifraproizvoda
      // );
      this.stavkaFaktureForma.reset();
      this.stavkaFaktureForma.get('proizvod').setValue('');
      if (this.proizvodi.length === 0) {
        this.stavkaFaktureForma.disable();
      }
      this.prikazPorukeStavkaError = false;
    } else {
      this.prikazPorukeStavkaError = true;
    }
  }

  selektovanjeStavkeFakture(stavkaFakture: StavkaFakture) {
    this.selektovanaStavkaFaktura = stavkaFakture;
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

  vratiNaSveFakture() {
    this.router.navigate(['fakture-svi']);
  }

  sacuvajStavkuFakture() {
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

    let stavkaZaIzmenu: StavkaFakture = this.stavkeFakture.find(
      (stavka) => stavka.brojSF === this.stavkaFaktureForma.get('brojSF').value
    );

    if (this.stavkaFaktureForma.valid) {
      stavkaZaIzmenu.ean = this.stavkaFaktureForma.get('ean').value;
      stavkaZaIzmenu.kolicina = this.stavkaFaktureForma.get('kolicina').value;
      stavkaZaIzmenu.opis = this.stavkaFaktureForma.get('opis').value;
      let proizvod: Proizvod = new Proizvod();
      proizvod.sifraproizvoda = this.stavkaFaktureForma.get('proizvod').value;
      proizvod.nazivProizvoda = this.proizvodi.find(
        (p) =>
          p.sifraproizvoda === this.stavkaFaktureForma.get('proizvod').value
      ).nazivProizvoda;
      stavkaZaIzmenu.proizvod = proizvod;
      stavkaZaIzmenu.status = Status.UPDATE;
      this.prikazPorukeStavkaError = false;
      this.stavkaFaktureForma.reset();
      this.stavkaFaktureForma.controls['proizvod'].setValue('');
      this.stavkaFaktureForma.controls['brojSF'].enable();
      this.selektovanaStavkaFaktura = undefined;
    } else {
      this.prikazPorukeStavkaError = true;
    }
  }

  izmeniStavkuFakture() {
    this.stavkaFaktureForma.controls['brojSF'].setValue(
      this.selektovanaStavkaFaktura.brojSF
    );
    this.stavkaFaktureForma.controls['brojSF'].disable();
    this.stavkaFaktureForma.controls['opis'].setValue(
      this.selektovanaStavkaFaktura.opis
    );
    this.stavkaFaktureForma.controls['ean'].setValue(
      this.selektovanaStavkaFaktura.ean
    );
    this.stavkaFaktureForma.controls['kolicina'].setValue(
      this.selektovanaStavkaFaktura.kolicina
    );
    this.stavkaFaktureForma.controls['proizvod'].setValue(
      this.selektovanaStavkaFaktura.proizvod.sifraproizvoda
    );
    this.prikazPorukeStavkaError = false;
  }

  obrisiStavkuFakture() {
    this.selektovanaStavkaFaktura.status = Status.DELETE;
    this.selektovanaStavkaFaktura = undefined;
  }
}
