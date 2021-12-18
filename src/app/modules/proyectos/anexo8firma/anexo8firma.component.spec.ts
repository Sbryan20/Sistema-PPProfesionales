import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo8firmaComponent } from './anexo8firma.component';

describe('Anexo8firmaComponent', () => {
  let component: Anexo8firmaComponent;
  let fixture: ComponentFixture<Anexo8firmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo8firmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo8firmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
