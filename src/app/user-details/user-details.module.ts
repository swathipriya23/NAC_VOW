import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { UserCreationComponent} from './user-creation/user-creation.component'
import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserSummaryComponent } from './user-summary/user-summary.component';



@NgModule({
  declarations: [UserCreationComponent, UserSummaryComponent],
  imports: [
    CommonModule,
    UserDetailsRoutingModule,MaterialModule, SharedModule
  ]
})
export class UserDetailsModule { }
