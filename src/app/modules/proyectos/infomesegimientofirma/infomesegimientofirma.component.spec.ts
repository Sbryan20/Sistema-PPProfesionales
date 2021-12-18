import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfomesegimientofirmaComponent } from './infomesegimientofirma.component';

describe('InfomesegimientofirmaComponent', () => {
  let component: InfomesegimientofirmaComponent;
  let fixture: ComponentFixture<InfomesegimientofirmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfomesegimientofirmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfomesegimientofirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
