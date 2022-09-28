import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuardService } from '../can-activate-guard.service';
import { CreateBranchComponent } from './create-branch/create-branch.component';
import { BranchSummaryComponent } from './branch-summary/branch-summary.component';
import { BranchViewComponent } from './branch-view/branch-view.component';
import { PaymentComponent } from './payment/payment.component'; 
import { PaymentUpdateComponent } from './payment-update/payment-update.component';

const routes: Routes = [{
  path: '', canActivate: [CanActivateGuardService],
  children: [
    { path: 'branch', component: CreateBranchComponent },
    { path: 'branchsummary', component: BranchSummaryComponent },
    { path: 'branchView', component: BranchViewComponent},
    { path: 'payment', component: PaymentComponent},
    { path:'paymentUpdate', component: PaymentUpdateComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchDetailsRoutingModule { }
