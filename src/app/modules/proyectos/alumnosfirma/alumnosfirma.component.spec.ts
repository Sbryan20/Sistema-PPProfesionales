import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosfirmaComponent } from './alumnosfirma.component';

describe('AlumnosfirmaComponent', () => {
  let component: AlumnosfirmaComponent;
  let fixture: ComponentFixture<AlumnosfirmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnosfirmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosfirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
