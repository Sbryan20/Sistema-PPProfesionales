import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo13extendidoComponent } from './anexo13extendido.component';

describe('Anexo13extendidoComponent', () => {
  let component: Anexo13extendidoComponent;
  let fixture: ComponentFixture<Anexo13extendidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo13extendidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo13extendidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
