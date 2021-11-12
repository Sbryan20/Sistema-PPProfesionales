import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosolicitudesComponent } from './proyectosolicitudes.component';

describe('ProyectosolicitudesComponent', () => {
  let component: ProyectosolicitudesComponent;
  let fixture: ComponentFixture<ProyectosolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
