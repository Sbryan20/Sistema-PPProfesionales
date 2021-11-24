import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo10extendidoComponent } from './anexo10extendido.component';

describe('Anexo10extendidoComponent', () => {
  let component: Anexo10extendidoComponent;
  let fixture: ComponentFixture<Anexo10extendidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo10extendidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo10extendidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
