import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KupacPrikaziComponent } from './kupac-prikazi.component';

describe('KupacPrikaziComponent', () => {
  let component: KupacPrikaziComponent;
  let fixture: ComponentFixture<KupacPrikaziComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KupacPrikaziComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KupacPrikaziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
