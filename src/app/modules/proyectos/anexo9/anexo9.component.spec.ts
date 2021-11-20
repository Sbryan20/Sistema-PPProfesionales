import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo9Component } from './anexo9.component';

describe('Anexo9Component', () => {
  let component: Anexo9Component;
  let fixture: ComponentFixture<Anexo9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
