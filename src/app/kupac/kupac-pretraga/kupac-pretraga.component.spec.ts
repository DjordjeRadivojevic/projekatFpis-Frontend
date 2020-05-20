import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KupacPretragaComponent } from './kupac-pretraga.component';

describe('KupacPretragaComponent', () => {
  let component: KupacPretragaComponent;
  let fixture: ComponentFixture<KupacPretragaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KupacPretragaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KupacPretragaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
