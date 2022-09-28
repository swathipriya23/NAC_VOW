import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectSummaryComponent } from './project-summary/project-summary.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { CanActivateGuardService } from '../can-activate-guard.service';

const routes: Routes = [{
  path: '', canActivate: [CanActivateGuardService],
  children: [
    { path: 'projectsummary', component: ProjectSummaryComponent },
    { path: 'Projectview', component: ProjectViewComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailsRoutingModule { }
