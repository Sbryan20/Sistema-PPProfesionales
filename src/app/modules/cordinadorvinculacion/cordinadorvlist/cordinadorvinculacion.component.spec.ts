import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CordinadorvinculacionComponent } from './cordinadorvinculacion.component';

describe('CordinadorvinculacionComponent', () => {
  let component: CordinadorvinculacionComponent;
  let fixture: ComponentFixture<CordinadorvinculacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CordinadorvinculacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CordinadorvinculacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
