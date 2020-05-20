import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KupacIzmeniComponent } from './kupac-izmeni.component';

describe('KupacIzmeniComponent', () => {
  let component: KupacIzmeniComponent;
  let fixture: ComponentFixture<KupacIzmeniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KupacIzmeniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KupacIzmeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
