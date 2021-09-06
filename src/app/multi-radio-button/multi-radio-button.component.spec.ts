import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRadioButtonComponent } from './multi-radio-button.component';

describe('MultiRadioButtonComponent', () => {
  let component: MultiRadioButtonComponent;
  let fixture: ComponentFixture<MultiRadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiRadioButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
