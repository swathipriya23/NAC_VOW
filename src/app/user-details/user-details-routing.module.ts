import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuardService } from '../can-activate-guard.service';
import { UserCreationComponent} from './user-creation/user-creation.component';
import { UserSummaryComponent} from './user-summary/user-summary.component';


const routes: Routes = [
  {
    path: '', canActivate: [CanActivateGuardService],
    children: [
      { path: 'usercreation', component: UserCreationComponent },
      { path: 'usersummary', component: UserSummaryComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailsRoutingModule { }
