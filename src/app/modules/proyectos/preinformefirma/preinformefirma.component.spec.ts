import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreinformefirmaComponent } from './preinformefirma.component';

describe('PreinformefirmaComponent', () => {
  let component: PreinformefirmaComponent;
  let fixture: ComponentFixture<PreinformefirmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreinformefirmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreinformefirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
