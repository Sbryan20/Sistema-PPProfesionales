import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosencargoComponent } from './alumnosencargo.component';

describe('AlumnosencargoComponent', () => {
  let component: AlumnosencargoComponent;
  let fixture: ComponentFixture<AlumnosencargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnosencargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosencargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
