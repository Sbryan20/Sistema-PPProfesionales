import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoconvocatoriaComponent } from './alumnoconvocatoria.component';

describe('AlumnoconvocatoriaComponent', () => {
  let component: AlumnoconvocatoriaComponent;
  let fixture: ComponentFixture<AlumnoconvocatoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoconvocatoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoconvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
