import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakturaPrikaziComponent } from './faktura-prikazi.component';

describe('FakturaPrikaziComponent', () => {
  let component: FakturaPrikaziComponent;
  let fixture: ComponentFixture<FakturaPrikaziComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakturaPrikaziComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakturaPrikaziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
