import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreinformeseguimientoComponent } from './preinformeseguimiento.component';

describe('PreinformeseguimientoComponent', () => {
  let component: PreinformeseguimientoComponent;
  let fixture: ComponentFixture<PreinformeseguimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreinformeseguimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreinformeseguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
