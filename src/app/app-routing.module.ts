import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { CanActivateGuardService } from './can-activate-guard.service';
import { SignupComponent} from './signup/signup.component'
// import { UserDetailsComponent } from './user-details/user-details.component';
// import { VowErrorRouteComponent } from './vow-error-route/vow-error-route.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component:SignupComponent,canActivate: [CanActivateGuardService]},
  { path: 'welcome', component: AboutComponent, canActivate: [CanActivateGuardService] },

  // { path: 'user', component: UserDetailsComponent, canActivate: [CanActivateGuardService] },
  // { path: 'errorroute', component: VowErrorRouteComponent },
  
  { path: 'candidate', loadChildren: () => import("./candidate-details/candidate-details.module").then(m => m.CandidateDetailsModule), canActivate: [CanActivateGuardService]},
  { path: 'user', loadChildren: () => import("./user-details/user-details.module").then(m => m.UserDetailsModule), canActivate: [CanActivateGuardService]},
  { path: 'vendordocument', loadChildren: () => import("./vendor-document/vendor-document.module").then(m => m.VendorDocumentModule), canActivate: [CanActivateGuardService]},
  { path: 'branchdetails', loadChildren: () => import("./branch-details/branch--details.module").then(m => m.BranchDetailsModule), canActivate: [CanActivateGuardService]},
  { path: 'projectdetails', loadChildren: () => import("./project-details/project-details.module").then(m => m.ProjectDetailsModule), canActivate: [CanActivateGuardService]},
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
