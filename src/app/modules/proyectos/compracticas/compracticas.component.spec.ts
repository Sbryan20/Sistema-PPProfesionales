import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompracticasComponent } from './compracticas.component';

describe('CompracticasComponent', () => {
  let component: CompracticasComponent;
  let fixture: ComponentFixture<CompracticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompracticasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompracticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
