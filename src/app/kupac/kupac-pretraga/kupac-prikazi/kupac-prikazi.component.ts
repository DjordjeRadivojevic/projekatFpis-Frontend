import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { KupacService } from 'src/app/services/kupac.service';
import { Kupac } from 'src/app/models/kupac.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-kupac-prikazi',
  templateUrl: './kupac-prikazi.component.html',
  styleUrls: ['./kupac-prikazi.component.css'],
})
export class KupacPrikaziComponent implements OnInit {
  kupacForma: FormGroup;
  kupac: Kupac;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private kupacService: KupacService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const pib = data['pib'];
      if (pib) {
        this.kupacService.vratiKupca(pib).subscribe((data: Kupac) => {
          this.kupac = data;
          this.kreirajKupacFormu();
        });
      }
    });
  }

  kreirajKupacFormu() {
    this.kupacForma = this.formBuilder.group({
      pib: [{ value: this.kupac ? this.kupac.pib : '', disabled: true }],
      nazivKupca: [
        { value: this.kupac ? this.kupac.nazivKupca : '', disabled: true },
      ],
      emailKupca: [
        { value: this.kupac ? this.kupac.emailKupca : '', disabled: true },
      ],
      telefonKupca: [
        { value: this.kupac ? this.kupac.telefonKupca : '', disabled: true },
      ],
      potpis: [{ value: this.kupac ? this.kupac.potpis : '', disabled: true }],
      grad: [
        {
          value: this.kupac ? this.kupac.adresa.ulica.grad.nazivGrada : '',
          disabled: true,
        },
      ],
      ulica: [
        {
          value: this.kupac ? this.kupac.adresa.ulica.nazivUlice : '',
          disabled: true,
        },
      ],
      broj: [
        {
          value: this.kupac ? this.kupac.adresa.brojAdrese : '',
          disabled: true,
        },
      ],
    });
  }

  vratiNaPretragu() {
    this.router.navigate(['kupac-pretraga']);
  }
}
