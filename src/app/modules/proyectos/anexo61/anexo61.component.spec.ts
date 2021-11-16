import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo61Component } from './anexo61.component';

describe('Anexo61Component', () => {
  let component: Anexo61Component;
  let fixture: ComponentFixture<Anexo61Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo61Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo61Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
