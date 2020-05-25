import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { KupacService } from 'src/app/services/kupac.service';
import { Kupac } from 'src/app/models/kupac.model';

@Component({
  selector: 'app-kupac-pretraga',
  templateUrl: './kupac-pretraga.component.html',
  styleUrls: ['./kupac-pretraga.component.css'],
})
export class KupacPretragaComponent implements OnInit {
  kupacPretragaForma: FormGroup;
  kupci: Kupac[] = [];
  selektovanKupac: Kupac;
  prikazPorukeError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private kupacService: KupacService
  ) {}

  ngOnInit(): void {
    this.kupacPretragaForma = this.formBuilder.group({
      nazivKupca: [''],
    });
  }

  pronadjiKupce(nazivKupca: string) {
    if (nazivKupca) {
      return this.kupacService
        .pronadjiKupce(nazivKupca)
        .subscribe((data: Kupac[]) => {
          this.kupci = data;
          this.prikazPorukeError = false;
        });
    } else {
      this.kupci = [];
      this.selektovanKupac = undefined;
      this.prikazPorukeError = true;
    }
  }

  selektovanjeKupca(kupac: Kupac) {
    this.selektovanKupac = kupac;
  }

  izbrisiKupca() {
    this.kupacService.izbrisiKupca(this.selektovanKupac.pib).subscribe(() => {
      return this.pronadjiKupce(
        this.kupacPretragaForma.get('nazivKupca').value
      );
    });
    this.selektovanKupac = undefined;
  }
  izmeniKupca() {
    this.router.navigate(['kupac-izmeni', this.selektovanKupac.pib]);
  }
  prikaziKupca() {
    this.router.navigate(['kupac-prikazi', this.selektovanKupac.pib]);
  }
}
