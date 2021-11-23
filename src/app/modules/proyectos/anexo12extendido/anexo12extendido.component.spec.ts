import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo12extendidoComponent } from './anexo12extendido.component';

describe('Anexo12extendidoComponent', () => {
  let component: Anexo12extendidoComponent;
  let fixture: ComponentFixture<Anexo12extendidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Anexo12extendidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Anexo12extendidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
