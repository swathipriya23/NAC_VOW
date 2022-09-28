import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { VendorDocumentRoutingModule } from './vendor-document-routing.module';
import { VendorDocSummaryComponent } from './vendor-doc-summary/vendor-doc-summary.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';


@NgModule({
  declarations: [
    VendorDocSummaryComponent,
    CreateDocumentComponent,
    DocumentEditComponent
  ],
  imports: [
    CommonModule,
    VendorDocumentRoutingModule,MaterialModule, SharedModule
  ]
})
export class VendorDocumentModule { }
