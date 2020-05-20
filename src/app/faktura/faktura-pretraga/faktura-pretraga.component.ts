import { Component, OnInit } from '@angular/core';
import { FakturaService } from 'src/app/services/faktura.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Faktura } from 'src/app/models/faktura.model';
import { Stanje } from 'src/app/models/stanje.enum';

@Component({
  selector: 'app-faktura-pretraga',
  templateUrl: './faktura-pretraga.component.html',
  styleUrls: ['./faktura-pretraga.component.css'],
})
export class FakturaPretragaComponent implements OnInit {
  fakturaPretragaForma: FormGroup;
  stanjaFakture: FormGroup;
  fakture: Faktura[] = [];
  cekiraneFakture: Faktura[] = [];
  selektovanaFaktura: Faktura;
  selektovanaStanja: String[];
  stanja = [
    { ime: Stanje.POPUNJENA },
    { ime: Stanje.PROVERENA },
    { ime: Stanje.VALIDIRANA },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private fakturaService: FakturaService
  ) {}

  ngOnInit(): void {
    this.fakturaPretragaForma = this.formBuilder.group({
      datumPrometa: [''],
    });
    this.stanjaFakture = this.formBuilder.group({
      checkboxArray: this.formBuilder.array([]),
    });
  }

  onChange(ime: string, isChecked: boolean) {
    let stanjaChecked = this.stanjaFakture.controls.checkboxArray as FormArray;

    if (isChecked) {
      stanjaChecked.push(new FormControl(ime));
    } else {
      let index = stanjaChecked.controls.findIndex((x) => x.value === ime);
      stanjaChecked.removeAt(index);
    }
    this.cekiraneFakture = this.fakture.filter((data: Faktura) => {
      return stanjaChecked.value.includes(data.stanje.valueOf());
    });
    this.selektovanaFaktura = undefined;
  }

  pronadjiFakture(datumPrometa: string) {
    if (datumPrometa) {
      return this.fakturaService
        .pronadjiFakture(datumPrometa)
        .subscribe((data: Faktura[]) => {
          this.fakture = data;
          this.cekiraneFakture = data;
          this.selektovanaFaktura = undefined;
        });
    } else {
      this.fakture = [];
      this.selektovanaFaktura = undefined;
    }
  }

  selektovanjeFakture(faktura: Faktura) {
    this.selektovanaFaktura = faktura;
  }

  izbrisiFakturu() {
    this.fakturaService
      .izbrisiFakturu(this.selektovanaFaktura.sifraFakture)
      .subscribe(() => {
        return this.pronadjiFakture(
          this.fakturaPretragaForma.get('datumPrometa').value
        );
      });
    this.selektovanaFaktura = undefined;
  }
  izmeniFakturu() {
    this.router.navigate([
      'faktura-izmeni',
      this.selektovanaFaktura.sifraFakture,
    ]);
  }
  prikaziFakturu() {
    this.router.navigate([
      'faktura-prikazi',
      this.selektovanaFaktura.sifraFakture,
    ]);
  }
}
