import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms'
import { VendorDocumentService} from '../vendor-document.service'
import { Router } from '@angular/router'
import { VowSharedService} from 'src/app/service/vow-shared.service'
import { NotificationService} from 'src/app/service/notification.service';
import { VendorDocShareService } from '../vendor-doc-share.service';

@Component({
  selector: 'app-vendor-doc-summary',
  templateUrl: './vendor-doc-summary.component.html',
  styleUrls: ['./vendor-doc-summary.component.scss']
})
export class VendorDocSummaryComponent implements OnInit {

  vendorDocsummaryList: any;
  branch_code:any;

  constructor(private router: Router,private notification: NotificationService,private vowShareService: VowSharedService,
    private vendordocService: VendorDocumentService,private vendordocshareservice: VendorDocShareService) { }

  ngOnInit(): void {
    let data:any = this.vowShareService.vendorDocScreen_loginResult.value
    this.branch_code = data.branch_code
    console.log("vendor-id",this.branch_code)
    this.GetVendorDocument_Summary();
  }

  // vendor document summary details
  GetVendorDocument_Summary() {

    this.vendordocService.GetVendorDocument_Summary(this.branch_code)
      .subscribe((results: any[]) => {
          console.log("vendordocsummarydetails", results)
          let datas = results["data"];
          this.vendorDocsummaryList = datas;
      })
   
    
  }


  addVendorDocument(){
    this.router.navigate(['vendordocument/createdoc']);
  }

  documentEdit(list){
    this.vendordocshareservice.docEdit.next(list);
    this.router.navigate(['vendordocument/docEdit']);
  }


  documentDelete(data) {
    let document_Id = data.id
    if (confirm("Delete Document details?")) {
    this.vendordocService.deletedocument(document_Id,this.branch_code)
      .subscribe(result => {
        if (result['status'] != undefined || result['status'] == 'success') {
          this.notification.showSuccess("Successfully deleted")
          this.GetVendorDocument_Summary();
          return true
        } else {
          this.notification.showError(result['code'])
        }



      })}
      else{
        return false;
      }

  }


}
