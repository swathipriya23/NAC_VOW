import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms'
import { UserDetailsService} from '../user-details.service'
import { Router } from '@angular/router'
import { NgxSpinnerService } from "ngx-spinner";
import { VowSharedService } from 'src/app/service/vow-shared.service'; 
import { NotificationService } from 'src/app/service/notification.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlingService } from 'src/app/service/error-handling.service'; 

@Component({
  selector: 'app-user-summary',
  templateUrl: './user-summary.component.html',
  styleUrls: ['./user-summary.component.scss']
})
export class UserSummaryComponent implements OnInit {
  // summaryList: any;


   
  // ispaymentpage: boolean = true;
  // userpresentpage: number = 1;
  // userpagesize = 10;
  // has_usernext = true;
  // has_userprevious = true;



  userSummaryList:any;

  has_next = true;
  has_previous = true;
  currentpage: number = 1;
  presentpage: number = 1;
  pageSize=10;
  isUserPagination: boolean;
  adminForm:FormGroup;
  hide = true;
  hided = true;
  user_summary_id:any;
  user_summary_name:any;
  @ViewChild('changeadmin')changeadmin;

  constructor(
    // private fb: FormBuilder,private userService: UserDetailsService,private router: Router
    private fb: FormBuilder,private userService: UserDetailsService,private router: Router,private vowShareService: VowSharedService,
    private notification: NotificationService,private toastr: ToastrService,private SpinnerService: NgxSpinnerService,private errorHandler: ErrorHandlingService
    ) { }

  // ngOnInit(): void {
  //   this.GetUser_Summary();
  // }

  //  // user summary details
  //  GetUser_Summary() {

  //   this.userService.GetUser_SummaryDetails()
  //     .subscribe((results: any[]) => {
  //         console.log("usersummarydetails", results)
  //         let datas = results["data"];
  //         this.summaryList = datas;
  //     })
   
    
  // }

  // userCreation(){
  //   this.router.navigate(['user/usercreation']);
  // }



  ngOnInit(): void {
    this.adminForm = this.fb.group({
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      re_password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
    });
    this.getUserSummary();
  }

  getUserSummary(pageNumber = 1) {
    this.userService.getUserSummary(pageNumber, this.vowShareService.portal_code)
      .subscribe(result => {
        this.userSummaryList = result['data']
        let dataPagination = result['pagination'];
        if (this.userSummaryList.length >= 0) {
          this.has_next = dataPagination.has_next;
          this.has_previous = dataPagination.has_previous;
          this.presentpage = dataPagination.index;
          this.isUserPagination = true;
        } if (this.userSummaryList <= 0) {
          this.isUserPagination = false;
        }

        console.log("VendorSummary", result)
      })
  }
  
  

  nextClick() {
    if (this.has_next === true) {
      this.getUserSummary(this.presentpage + 1)
    }
  }

  previousClick() {
    if (this.has_previous === true) {
      this.getUserSummary(this.presentpage - 1)
    }

}


portaluserActiveInactive(status, linedata) {
  let code = linedata?.code
  this.userService.portaluserActiveInactive(code, status)
    .subscribe(results => {
      console.log("results", results)
      this.notification.showSuccess("Success")
      this.getUserSummary(1) 
    })
}

resetforn(linedata){
  this.user_summary_id = linedata?.id
  this.user_summary_name = linedata?.name
  // this.adminForm.patchValue({
  //   "password": "",
  //   "re_password":"",
  //   "user_id":""
  // })
  this.adminForm = this.fb.group({
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    ])],
    re_password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
    ])],
  });
}


  // change pwd

  admin_submit(){
    this.SpinnerService.show();
   
    if (this.adminForm.value.password === "") {
      this.toastr.error('', 'Please Enter New Password', { timeOut: 1500 });
      this.SpinnerService.hide();
      return false;
    }
    if (this.adminForm.value.re_password === "") {
      this.toastr.error('', 'Please Enter Confirm Password', { timeOut: 1500 });
      this.SpinnerService.hide();
      return false;
    }
    this.adminForm.value.user_id = this.user_summary_id;

    this.userService.getAdmin(this.adminForm.value)
      .subscribe((result) => {
        console.log(result)
    if (result.status == "success") {
    this.notification.showSuccess("New Password Changed")
    this.changeadmin.nativeElement.click();
    this.SpinnerService.hide();
      } else {
        this.notification.showError(result.description)
        this.SpinnerService.hide();
      } 
      },
      error => {
        this.errorHandler.handleError(error);
        this.SpinnerService.hide();
      }
      )
    
  }

}
