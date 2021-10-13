import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoresponComponent } from './proyectorespon.component';

describe('ProyectoresponComponent', () => {
  let component: ProyectoresponComponent;
  let fixture: ComponentFixture<ProyectoresponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoresponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoresponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
