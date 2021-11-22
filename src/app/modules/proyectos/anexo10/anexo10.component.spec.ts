import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo10Component } from './anexo10.component';

describe('Anexo10Component', () => {
  let component: Anexo10Component;
  let fixture: ComponentFixture<Anexo10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
