import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkaletonComponent } from './skaleton.component';

describe('SkaletonComponent', () => {
  let component: SkaletonComponent;
  let fixture: ComponentFixture<SkaletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkaletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkaletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
