import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { KupacService } from 'src/app/services/kupac.service';
import { Kupac } from 'src/app/models/kupac.model';
import { Grad } from 'src/app/models/grad.model';
import { Ulica } from 'src/app/models/ulica.model';
import { Adresa } from 'src/app/models/adresa.model';
import { Zaposleni } from 'src/app/models/zaposleni.model';
import { AdresaService } from 'src/app/services/adresa.service';

@Component({
  selector: 'app-kupac-izmeni',
  templateUrl: './kupac-izmeni.component.html',
  styleUrls: ['./kupac-izmeni.component.css'],
})
export class KupacIzmeniComponent implements OnInit {
  kupacForma: FormGroup;
  kupac: Kupac;
  gradovi: Grad[] = [];
  ulice: Ulica[] = [];
  brojevi: Adresa[] = [];
  zaposleni: Zaposleni[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private kupacService: KupacService,
    private adresaService: AdresaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const pib = data['pib'];
      if (pib) {
        this.kupacService.vratiKupca(pib).subscribe((data: Kupac) => {
          this.kupacService
            .vratiSveZaposlene()
            .subscribe((data: Zaposleni[]) => {
              this.zaposleni = data;
            });
          this.kupac = data;
          this.adresaService.vratiSveGradove().subscribe((data: Grad[]) => {
            this.gradovi = data;
          });
          this.adresaService
            .vratiSveUlice(this.kupac.adresa.ulica.grad.postanskiBroj)
            .subscribe((data: Ulica[]) => {
              this.ulice = data;
            });
          this.adresaService
            .vratiSveAdrese(
              this.kupac.adresa.ulica.grad.postanskiBroj,
              this.kupac.adresa.ulica.sifraUlice
            )
            .subscribe((data: Adresa[]) => {
              this.brojevi = data;
            });

          this.kreirajKupacFormu();
        });
      }
    });
  }
  kreirajKupacFormu() {
    this.kupacForma = this.formBuilder.group({
      pib: [{ value: this.kupac ? this.kupac.pib : '', disabled: true }],
      nazivKupca: [this.kupac ? this.kupac.nazivKupca : ''],
      emailKupca: [this.kupac ? this.kupac.emailKupca : ''],
      telefonKupca: [this.kupac ? this.kupac.telefonKupca : ''],
      potpis: [this.kupac ? this.kupac.potpis : ''],
      grad: [this.kupac ? this.kupac.adresa.ulica.grad.postanskiBroj : ''],
      ulica: [this.kupac ? this.kupac.adresa.ulica.sifraUlice : ''],
      broj: [this.kupac ? this.kupac.adresa.adresaID : ''],
    });
  }

  izmeniKupca() {
    this.kupacForma.controls['pib'].setValidators(Validators.required);
    this.kupacForma.controls['pib'].updateValueAndValidity();
    this.kupacForma.controls['nazivKupca'].setValidators(Validators.required);
    this.kupacForma.controls['nazivKupca'].updateValueAndValidity();
    this.kupacForma.controls['emailKupca'].setValidators(Validators.required);
    this.kupacForma.controls['emailKupca'].updateValueAndValidity();
    this.kupacForma.controls['telefonKupca'].setValidators(Validators.required);
    this.kupacForma.controls['telefonKupca'].updateValueAndValidity();
    this.kupacForma.controls['potpis'].setValidators(Validators.required);
    this.kupacForma.controls['potpis'].updateValueAndValidity();
    this.kupacForma.controls['grad'].setValidators(Validators.required);
    this.kupacForma.controls['grad'].updateValueAndValidity();
    this.kupacForma.controls['ulica'].setValidators(Validators.required);
    this.kupacForma.controls['ulica'].updateValueAndValidity();
    this.kupacForma.controls['broj'].setValidators(Validators.required);
    this.kupacForma.controls['broj'].updateValueAndValidity();

    if (this.kupacForma.valid) {
      const kupac: Kupac = {
        pib: this.kupacForma.get('pib').value,
        nazivKupca: this.kupacForma.get('nazivKupca').value,
        emailKupca: this.kupacForma.get('emailKupca').value,
        telefonKupca: this.kupacForma.get('telefonKupca').value,
        potpis: this.kupacForma.get('potpis').value,
        adresa: {
          adresaID: this.kupacForma.get('broj').value,
          ulica: {
            sifraUlice: this.kupacForma.get('ulica').value,
            grad: {
              postanskiBroj: this.kupacForma.get('grad').value,
            },
          },
        },
      };

      this.kupacService.izmeniKupca(kupac).subscribe((data: Kupac) => {
        if (data) {
          this.vratiNaSveKupce();
        } else {
          // obavestenje da nije zapamtilo
        }
      });
    } else {
      //obavestenje da forma nije validna ili setuj validations poruke na formu
    }
  }

  vratiUlice(postanskiBroj: number) {
    this.kupacForma.get('ulica').setValue('');
    this.kupacForma.get('broj').setValue('');
    this.kupacForma.get('ulica').enable();
    this.kupacForma.get('broj').disable();
    this.adresaService
      .vratiSveUlice(postanskiBroj)
      .subscribe((data: Ulica[]) => {
        this.ulice = data;
      });
  }

  vratiAdrese(postanskiBroj: number, sifraUlice: string) {
    this.kupacForma.get('broj').setValue('');
    this.kupacForma.get('broj').enable();
    this.adresaService
      .vratiSveAdrese(postanskiBroj, sifraUlice)
      .subscribe((data: Adresa[]) => {
        this.brojevi = data;
      });
  }

  vratiNaSveKupce() {
    this.router.navigate(['kupac-svi']);
  }
}
