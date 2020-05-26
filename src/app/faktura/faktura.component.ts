import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FakturaService } from '../services/faktura.service';
import { Faktura } from '../models/faktura.model';
import { fadeAnimation, tableAnimation } from '../animations';

@Component({
  selector: 'app-faktura',
  templateUrl: './faktura.component.html',
  styleUrls: ['./faktura.component.css'],
  animations: [fadeAnimation, tableAnimation],
})
export class FakturaComponent implements OnInit {
  fakture: Faktura[];

  constructor(private fakturaService: FakturaService, private router: Router) {}

  ngOnInit(): void {
    this.fakturaService.vratiSveFakture().subscribe((data) => {
      this.fakture = data;
    });
  }
}
