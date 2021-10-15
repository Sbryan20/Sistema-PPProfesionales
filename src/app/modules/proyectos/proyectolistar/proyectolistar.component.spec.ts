import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectolistarComponent } from './proyectolistar.component';

describe('ProyectolistarComponent', () => {
  let component: ProyectolistarComponent;
  let fixture: ComponentFixture<ProyectolistarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectolistarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectolistarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
