import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';

import { BranchDetailsRoutingModule } from './branch--details-routing.module';
import { CreateBranchComponent } from './create-branch/create-branch.component';
import { BranchSummaryComponent } from './branch-summary/branch-summary.component';
import { BranchViewComponent } from './branch-view/branch-view.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentUpdateComponent } from './payment-update/payment-update.component';


@NgModule({
  declarations: [
    CreateBranchComponent,
    BranchSummaryComponent,
    BranchViewComponent,
    PaymentComponent,
    PaymentUpdateComponent
  ],
  imports: [
    CommonModule,
    BranchDetailsRoutingModule, MaterialModule, SharedModule
  ]
})
export class BranchDetailsModule { }
