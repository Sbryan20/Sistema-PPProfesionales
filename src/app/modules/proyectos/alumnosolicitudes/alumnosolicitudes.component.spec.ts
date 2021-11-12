import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosolicitudesComponent } from './alumnosolicitudes.component';

describe('AlumnosolicitudesComponent', () => {
  let component: AlumnosolicitudesComponent;
  let fixture: ComponentFixture<AlumnosolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnosolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
