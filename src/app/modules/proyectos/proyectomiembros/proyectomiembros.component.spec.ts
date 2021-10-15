import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectomiembrosComponent } from './proyectomiembros.component';

describe('ProyectomiembrosComponent', () => {
  let component: ProyectomiembrosComponent;
  let fixture: ComponentFixture<ProyectomiembrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectomiembrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectomiembrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
