import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiembroestudiantesComponent } from './miembroestudiantes.component';

describe('MiembroestudiantesComponent', () => {
  let component: MiembroestudiantesComponent;
  let fixture: ComponentFixture<MiembroestudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiembroestudiantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiembroestudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
