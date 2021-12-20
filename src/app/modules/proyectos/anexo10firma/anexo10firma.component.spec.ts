import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo10firmaComponent } from './anexo10firma.component';

describe('Anexo10firmaComponent', () => {
  let component: Anexo10firmaComponent;
  let fixture: ComponentFixture<Anexo10firmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo10firmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo10firmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
