import { Component, OnInit } from '@angular/core';
import { KupacService } from 'src/app/services/kupac.service';
import { Router } from '@angular/router';
import { Kupac } from 'src/app/models/kupac.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grad } from 'src/app/models/grad.model';
import { AdresaService } from 'src/app/services/adresa.service';
import { Zaposleni } from 'src/app/models/zaposleni.model';
import { Ulica } from 'src/app/models/ulica.model';
import { Adresa } from 'src/app/models/adresa.model';
import { fadeAnimation } from 'src/app/animations';

@Component({
  selector: 'app-kupac-novi',
  templateUrl: './kupac-novi.component.html',
  styleUrls: ['./kupac-novi.component.css'],
  animations: [fadeAnimation],
})
export class KupacNoviComponent implements OnInit {
  kupacForma: FormGroup;
  gradovi: Grad[] = [];
  ulice: Ulica[] = [];
  brojevi: Adresa[] = [];
  zaposleni: Zaposleni[] = [];
  prikazPorukeError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private kupacService: KupacService,
    private adresaService: AdresaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.kreirajKupacFormu();
    this.adresaService.vratiSveGradove().subscribe((data: Grad[]) => {
      this.gradovi = data;
    });
    this.kupacService.vratiSveZaposlene().subscribe((data: Zaposleni[]) => {
      this.zaposleni = data;
    });
  }

  kreirajKupacFormu() {
    this.kupacForma = this.formBuilder.group({
      pib: [''],
      nazivKupca: [''],
      emailKupca: [''],
      telefonKupca: [''],
      potpis: [''],
      grad: [''],
      ulica: [{ value: '', disabled: true }],
      broj: [{ value: '', disabled: true }],
    });
  }

  zapamtiKupca() {
    this.kupacForma.controls['pib'].setValidators(Validators.required);
    this.kupacForma.controls['pib'].updateValueAndValidity();
    this.kupacForma.controls['nazivKupca'].setValidators(Validators.required);
    this.kupacForma.controls['nazivKupca'].updateValueAndValidity();
    this.kupacForma.controls['emailKupca'].setValidators(Validators.required);
    this.kupacForma.controls['emailKupca'].updateValueAndValidity();
    this.kupacForma.controls['telefonKupca'].setValidators([
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^[0-9]*$'),
    ]);
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

      this.kupacService.zapamtiKupca(kupac).subscribe((data: Kupac) => {
        this.navigateKupacLista();
      });
    } else {
      this.prikazPorukeError = !this.kupacForma.valid;
    }
  }

  navigateKupacLista() {
    this.router.navigateByUrl('kupac-svi');
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
}
