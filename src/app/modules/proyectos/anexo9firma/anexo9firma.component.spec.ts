import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo9firmaComponent } from './anexo9firma.component';

describe('Anexo9firmaComponent', () => {
  let component: Anexo9firmaComponent;
  let fixture: ComponentFixture<Anexo9firmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo9firmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo9firmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
