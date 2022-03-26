import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoomComponent } from './hoom.component';

describe('HoomComponent', () => {
  let component: HoomComponent;
  let fixture: ComponentFixture<HoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
