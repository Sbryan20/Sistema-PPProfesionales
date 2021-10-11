import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CordinadorcvexistComponent } from './cordinadorcvexist.component';

describe('CordinadorcvexistComponent', () => {
  let component: CordinadorcvexistComponent;
  let fixture: ComponentFixture<CordinadorcvexistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CordinadorcvexistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CordinadorcvexistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
