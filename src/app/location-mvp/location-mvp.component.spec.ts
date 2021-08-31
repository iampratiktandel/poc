import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMvpComponent } from './location-mvp.component';

describe('LocationMvpComponent', () => {
  let component: LocationMvpComponent;
  let fixture: ComponentFixture<LocationMvpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationMvpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationMvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
