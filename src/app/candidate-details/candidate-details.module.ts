import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { CandidateDetailsRoutingModule } from './candidate-details-routing.module';
import { CandidateInfoComponent } from './candidate-info/candidate-info.component';
import { SharedModule } from '../shared/shared.module';
import { CandidateSummaryComponent } from './candidate-summary/candidate-summary.component';
import { CandidateProfileViewComponent } from './candidate-profile-view/candidate-profile-view.component';


@NgModule({
  declarations: [CandidateInfoComponent, CandidateSummaryComponent, CandidateProfileViewComponent],
  imports: [
    CommonModule,
    CandidateDetailsRoutingModule, MaterialModule, SharedModule
  ]
})
export class CandidateDetailsModule { }
