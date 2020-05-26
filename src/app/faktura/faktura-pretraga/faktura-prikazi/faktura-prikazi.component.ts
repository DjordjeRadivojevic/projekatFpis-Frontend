import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FakturaService } from 'src/app/services/faktura.service';
import { Faktura } from 'src/app/models/faktura.model';
import { StavkaFakture } from 'src/app/models/stavkaFakture.model';
import { fadeAnimation } from 'src/app/animations';

@Component({
  selector: 'app-faktura-prikazi',
  templateUrl: './faktura-prikazi.component.html',
  styleUrls: ['./faktura-prikazi.component.css'],
  animations: [fadeAnimation],
})
export class FakturaPrikaziComponent implements OnInit {
  fakturaForma: FormGroup;
  faktura: Faktura;
  stavkeFakture: StavkaFakture[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fakturaService: FakturaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const sifraFakture = data['sifraFakture'];
      if (sifraFakture) {
        this.fakturaService
          .vratiFakturu(sifraFakture)
          .subscribe((data: Faktura) => {
            this.faktura = data;
            this.kreirajFakturaFormu();
            this.stavkeFakture = this.faktura.stavkeFakture;
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
      datumPrometa: [
        {
          value: this.faktura ? this.faktura.datumPrometa : '',
          disabled: true,
        },
      ],
      valuta: [
        {
          value: this.faktura ? this.faktura.valuta : '',
          disabled: true,
        },
      ],
      stanje: [
        {
          value: this.faktura ? this.faktura.stanje : '',
          disabled: true,
        },
      ],
      nacinIsporuke: [
        {
          value: this.faktura
            ? this.faktura.nacinIsporuke.tipNacinaIsporuke
            : '',
          disabled: true,
        },
      ],
      nacinPlacanja: [
        {
          value: this.faktura ? this.faktura.nacinPlacanja.vrstaPlacanja : '',
          disabled: true,
        },
      ],
      zaposleni: [
        {
          value: this.faktura ? this.faktura.zaposleni.jmbg : '',
          disabled: true,
        },
      ],
      grad: [
        {
          value: this.faktura ? this.faktura.adresa.ulica.grad.nazivGrada : '',
          disabled: true,
        },
      ],
      ulica: [
        {
          value: this.faktura ? this.faktura.adresa.ulica.nazivUlice : '',
          disabled: true,
        },
      ],
      broj: [
        {
          value: this.faktura ? this.faktura.adresa.brojAdrese : '',
          disabled: true,
        },
      ],
    });
  }

  vratiNaPretragu() {
    this.router.navigate(['faktura-pretraga']);
  }
}
