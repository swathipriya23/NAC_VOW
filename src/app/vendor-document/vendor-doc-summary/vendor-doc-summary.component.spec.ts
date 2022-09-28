import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDocSummaryComponent } from './vendor-doc-summary.component';

describe('VendorDocSummaryComponent', () => {
  let component: VendorDocSummaryComponent;
  let fixture: ComponentFixture<VendorDocSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorDocSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorDocSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
