import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo13Component } from './anexo13.component';

describe('Anexo13Component', () => {
  let component: Anexo13Component;
  let fixture: ComponentFixture<Anexo13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo13Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
