import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo12Component } from './anexo12.component';

describe('Anexo12Component', () => {
  let component: Anexo12Component;
  let fixture: ComponentFixture<Anexo12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
