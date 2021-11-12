import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cordinadoranexo5Component } from './cordinadoranexo5.component';

describe('Cordinadoranexo5Component', () => {
  let component: Cordinadoranexo5Component;
  let fixture: ComponentFixture<Cordinadoranexo5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cordinadoranexo5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cordinadoranexo5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
