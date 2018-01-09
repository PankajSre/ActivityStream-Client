import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleActionsComponent } from './circle-actions.component';

describe('CircleActionsComponent', () => {
  let component: CircleActionsComponent;
  let fixture: ComponentFixture<CircleActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
