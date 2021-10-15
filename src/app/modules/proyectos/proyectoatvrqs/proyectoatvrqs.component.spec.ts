import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoatvrqsComponent } from './proyectoatvrqs.component';

describe('ProyectoatvrqsComponent', () => {
  let component: ProyectoatvrqsComponent;
  let fixture: ComponentFixture<ProyectoatvrqsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoatvrqsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoatvrqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
