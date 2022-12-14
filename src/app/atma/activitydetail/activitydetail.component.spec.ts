import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActivitydetailComponent } from './activitydetail.component';

describe('ActivitydetailComponent', () => {
  let component: ActivitydetailComponent;
  let fixture: ComponentFixture<ActivitydetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
