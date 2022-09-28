import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';


import { ProjectDetailsRoutingModule } from './project-details-routing.module';
import { ProjectViewComponent } from './project-view/project-view.component';


@NgModule({
  declarations: [
    ProjectViewComponent
  ],
  imports: [
    CommonModule,
    ProjectDetailsRoutingModule , SharedModule, MaterialModule,PdfViewerModule
  ]
})
export class ProjectDetailsModule { }
