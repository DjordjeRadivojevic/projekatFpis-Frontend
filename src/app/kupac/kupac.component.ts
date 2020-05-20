import { Component, OnInit } from '@angular/core';
import { KupacService } from '../services/kupac.service';
import { Router } from '@angular/router';
import { Kupac } from '../models/kupac.model';

@Component({
  selector: 'app-kupac',
  templateUrl: './kupac.component.html',
  styleUrls: ['./kupac.component.css'],
})
export class KupacComponent implements OnInit {
  kupci: Kupac[];

  constructor(private kupacService: KupacService, private router: Router) {}

  ngOnInit(): void {
    this.kupacService.vratiSveKupce().subscribe((data) => {
      this.kupci = data;
    });
  }
}
