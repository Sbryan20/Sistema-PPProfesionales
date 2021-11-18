import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanaprendizajefirmaComponent } from './planaprendizajefirma.component';

describe('PlanaprendizajefirmaComponent', () => {
  let component: PlanaprendizajefirmaComponent;
  let fixture: ComponentFixture<PlanaprendizajefirmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanaprendizajefirmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanaprendizajefirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
