import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteapoyoconvocatoriaComponent } from './docenteapoyoconvocatoria.component';

describe('DocenteapoyoconvocatoriaComponent', () => {
  let component: DocenteapoyoconvocatoriaComponent;
  let fixture: ComponentFixture<DocenteapoyoconvocatoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocenteapoyoconvocatoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteapoyoconvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
