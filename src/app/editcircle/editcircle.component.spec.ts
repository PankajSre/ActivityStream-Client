import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcircleComponent } from './editcircle.component';

describe('EditcircleComponent', () => {
  let component: EditcircleComponent;
  let fixture: ComponentFixture<EditcircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
