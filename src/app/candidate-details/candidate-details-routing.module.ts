import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuardService } from '../can-activate-guard.service';
import { CandidateInfoComponent } from './candidate-info/candidate-info.component';
import { CandidateSummaryComponent } from './candidate-summary/candidate-summary.component';
import { CandidateProfileViewComponent } from './candidate-profile-view/candidate-profile-view.component';




const routes: Routes = [{
  path: '', canActivate: [CanActivateGuardService],
  children: [
    { path: 'candidateinfo', component: CandidateInfoComponent },
    { path: 'candidatesummary', component: CandidateSummaryComponent },
    { path: 'dashboard', component: CandidateProfileViewComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateDetailsRoutingModule { }
