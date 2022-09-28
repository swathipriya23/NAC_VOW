import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSummaryComponent } from './branch-summary.component';

describe('BranchSummaryComponent', () => {
  let component: BranchSummaryComponent;
  let fixture: ComponentFixture<BranchSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
