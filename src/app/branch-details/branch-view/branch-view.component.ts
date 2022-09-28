import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchDetailsShareService } from '../branch-details-share.service'; 
import { BranchDetailsService } from '../branch-details.service';
import { NotificationService } from 'src/app/service/notification.service'

@Component({
  selector: 'app-branch-view',
  templateUrl: './branch-view.component.html',
  styleUrls: ['./branch-view.component.scss']
})
export class BranchViewComponent implements OnInit {
  branch_code:any;

  constructor(private branchDetailShareService: BranchDetailsShareService,private router: Router, private branchdetailservice: BranchDetailsService,
    private notification: NotificationService) { }

  ngOnInit(): void {
    let data = this.branchDetailShareService.branchView.value;
    this.branch_code = data.code
    console.log("branch-view",data);
    
    // this.Get_branch_patch();
    this.getBranchParticularData();
    this.getpaymentsummary();
  }


  branchname:any;
  branchGst:any;
  branchPan:any;
  branchPhone:any;
  Line1:any;
  Line2:any;
  Line3:any;
  Pincode:any;
  City:any;
  District:any;
  State:any;
  cname:any;
  Email:any;
  cmobile:any;
  cmobile2:any;
  Designation:any;
  getBranchParticularData() {
    this.branchdetailservice.getBranchParticularData(this.branch_code)
      .subscribe(result => {
          let data = result
          console.log("branch-view-api", data)
          this.branchname = data.name
          this.branchGst = data.pan_no;
          this.branchPan = data.gst_no;
          this.branchPhone = data.phone_no;

          if(data.address_id.line1 != null){
            this.Line1 = data.address_id.line1;
          }
          if(data.address_id.line2 != null){
            this.Line2 = data.address_id.line2;
          }
          if(data.address_id.line3 != null){
            this.Line3 = data.address_id.line3;
          }

          if(data.address_id.pincode_id != null){
            this.Pincode = data.address_id.pincode_id.no
          }
          if(data.address_id.city_id != null){
            this.City = data.address_id.city_id.name
          }
          if(data.address_id.district_id != null){
            this.District = data.address_id.district_id.name
          }
          if(data.address_id.state_id != null){
            this.State = data.address_id.state_id.name
          }


          if(data.contact_id.name != null){
            this.cname = data.contact_id.name;
          }
          if(data.contact_id.email != null){
            this.Email = data.contact_id.email;
          }
          if(data.contact_id.mobile_1 != null){
            this.cmobile = data.contact_id.mobile_1;
          }
          if(data.contact_id.mobile_2 != null){
            this.cmobile2 = data.contact_id.mobile_2;
          }
          if(data.contact_id.designation != null){
            this.Designation = data.contact_id.designation;
          }
      })
  }



  PaymentList:any;
//  payment summary
  getpaymentsummary() {
    this.branchdetailservice.getpaymentsummary()
      .subscribe((result) => {

        let datass = result['data'];
        let datapagination = result["pagination"];
        this.PaymentList = datass;
        console.log("pay", this.PaymentList)

        // if (this.getBranchList.length > 0) {
        //   this.has_next_payment = datapagination.has_next;
        //   this.has_previous_payment = datapagination.has_previous;
        //   this.presentpage_payment = datapagination.index;
        //   this.isPaymentPagination = true;
        // }
        // if (this.getBranchList <= 0) {
        //   this.isPaymentPagination = false;
        // }
        // if (this.has_next_payment == true) {
        //   this.has_next_payment = true;
        // }
        // if (this.has_previous_payment == true) {
        //   this.has_previous_payment = true;
        // }
      })

  }

  addPayment(){
    this.ispayment = false;
    this.paymentaddform = true;
    this.paymenteditform = false;
    this.branchDetailShareService.branchName.next(this.branchname)
  }


  paymentEdit(list){
    this.ispayment = false;
    this.paymentaddform = false;
    this.paymenteditform = true;
    this.branchDetailShareService.payment_particular.next(list)
    // this.router.navigate(['branchdetails/paymentUpdate']);
  }


  ispayment:boolean  = true;
  paymentaddform:boolean
  paymenteditform:boolean
  @ViewChild('closebuttonbranchPayment') closebuttonbranchPayment; 
  @ViewChild('closebuttonbranchPaymentedit') closebuttonbranchPaymentedit;
  paymentaddcancel() {
    this.ispayment = true;
    this.paymentaddform = false;
    this.paymenteditform = false;
    // this.closebuttonbranchPayment.nativeElement.click();
  }

  paymentaddsumbmit() {
    this.ispayment = true;
    this.paymentaddform = false;
    this.paymenteditform = false;
    this.getpaymentsummary();
    // this.closebuttonbranchPayment.nativeElement.click();

  }


  paymentEditCancel() {
    this.ispayment = true;
    this.paymentaddform = false;
    this.paymenteditform = false;
    this.closebuttonbranchPaymentedit.nativeElement.click();
  }
  paymentEditSumbmit() {
    this.ispayment = true;
    this.paymentaddform = false;
    this.paymenteditform = false;
    this.getpaymentsummary();
    // this.closebuttonbranchPaymentedit.nativeElement.click();
  }


  activeto_inactive(data){
    // this.SpinnerService.show();
    if(data.paymode_id.name=='DD'){
      data['paymode_id']=data.paymode_id.id
      data['bank_id']=0
      data['branch_id']=0

    }else{
      data['paymode_id']=data.paymode_id.id
      data['bank_id']=data.bank_id.id
      data['branch_id']=data.branch_id.id
    }
    if(data.is_active){
      data['is_active']=0
    }else{
      data['is_active']=1

    }
    this.branchdetailservice.paymentActive_Inactive(data)
    .subscribe(result => {
      if(result.id>0||result.id!=undefined){
        this.notification.showSuccess("Success")
        this.getpaymentsummary();
        // this.SpinnerService.hide();
          return false;
      }else{
        this.notification.showError('failes')
        // this.SpinnerService.hide();
          return false;
      }
     
    })
    // this.SpinnerService.hide();
  }








  backnavigate(){
    this.router.navigate(['branchdetails/branchsummary']);
  }

}
