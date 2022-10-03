import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr'
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { UserCreationComponent} from './user-creation/user-creation.component'
import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserSummaryComponent } from './user-summary/user-summary.component';



@NgModule({
  declarations: [UserCreationComponent, UserSummaryComponent],
  imports: [
    CommonModule,ToastrModule,
    UserDetailsRoutingModule,MaterialModule, SharedModule,NgxSpinnerModule, PdfViewerModule, FormsModule, ReactiveFormsModule
  ]
})
export class UserDetailsModule { }
