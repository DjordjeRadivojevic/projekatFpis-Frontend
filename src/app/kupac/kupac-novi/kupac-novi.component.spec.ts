import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KupacNoviComponent } from './kupac-novi.component';

describe('KupacNoviComponent', () => {
  let component: KupacNoviComponent;
  let fixture: ComponentFixture<KupacNoviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KupacNoviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KupacNoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
