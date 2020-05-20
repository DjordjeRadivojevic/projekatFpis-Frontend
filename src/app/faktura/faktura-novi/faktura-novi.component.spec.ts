import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakturaNoviComponent } from './faktura-novi.component';

describe('FakturaNoviComponent', () => {
  let component: FakturaNoviComponent;
  let fixture: ComponentFixture<FakturaNoviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakturaNoviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakturaNoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
