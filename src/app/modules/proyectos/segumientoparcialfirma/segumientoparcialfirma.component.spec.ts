import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegumientoparcialfirmaComponent } from './segumientoparcialfirma.component';

describe('SegumientoparcialfirmaComponent', () => {
  let component: SegumientoparcialfirmaComponent;
  let fixture: ComponentFixture<SegumientoparcialfirmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegumientoparcialfirmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegumientoparcialfirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
