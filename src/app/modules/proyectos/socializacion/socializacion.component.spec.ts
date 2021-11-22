import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocializacionComponent } from './socializacion.component';

describe('SocializacionComponent', () => {
  let component: SocializacionComponent;
  let fixture: ComponentFixture<SocializacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocializacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocializacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
