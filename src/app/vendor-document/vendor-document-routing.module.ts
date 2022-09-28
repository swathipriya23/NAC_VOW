import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuardService } from '../can-activate-guard.service';
import { VendorDocSummaryComponent} from './vendor-doc-summary/vendor-doc-summary.component';
import { CreateDocumentComponent} from './create-document/create-document.component';
import { DocumentEditComponent } from './document-edit/document-edit.component';

const routes: Routes = [
  {
    path: '', canActivate: [CanActivateGuardService],
    children: [
      { path: 'vendordocsummary', component: VendorDocSummaryComponent },
      { path: 'createdoc', component: CreateDocumentComponent},
      { path: 'docEdit', component: DocumentEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorDocumentRoutingModule { }
