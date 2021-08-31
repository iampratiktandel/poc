import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempMvpComponent } from './temp-mvp.component';

describe('TempMvpComponent', () => {
  let component: TempMvpComponent;
  let fixture: ComponentFixture<TempMvpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempMvpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempMvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
