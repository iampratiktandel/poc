import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSaveComponent } from './location-save.component';

describe('LocationSaveComponent', () => {
  let component: LocationSaveComponent;
  let fixture: ComponentFixture<LocationSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
