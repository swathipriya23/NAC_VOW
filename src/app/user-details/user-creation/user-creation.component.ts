import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms'
import { UserDetailsService} from '../user-details.service'
import { Router } from '@angular/router'
import { NotificationService } from 'src/app/service/notification.service';
import { ErrorHandlingService } from 'src/app/service/error-handling.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { VowSharedService } from 'src/app/service/vow-shared.service'; 

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent implements OnInit {

  UserCreation:FormGroup;
  passwordLength: Number = 6;
  roleTypeList:any;

  constructor(private fb: FormBuilder,private userService: UserDetailsService,private router: Router,private vowShareService: VowSharedService,
    private notification: NotificationService,private toastr: ToastrService,private SpinnerService: NgxSpinnerService,private errorHandler: ErrorHandlingService) { }

  ngOnInit(): void {
    this.UserCreation  = this.fb.group({
      name: [''],
      role: [1],
      phone_no: [''],
      port_id:[this.vowShareService.portal_id],
      email:['', [Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  });

  // this.GetRole();
  }

  
  // GetRole() {
  //   this.userService.getRole_Type()
  //     .subscribe((results: any[]) => {
  //       let datas = results["data"];
  //       this.roleTypeList = datas;
  //     })
  // }


  // password = ''


  
  

  
    //user creation
    submit_user_Creation() {
    this.SpinnerService.show();
    if (this.UserCreation.value.name === "") {
      this.toastr.error('', 'Please Enter Username', { timeOut: 1500 });
      this.SpinnerService.hide();
      return false;
    }
    if (this.UserCreation.value.email === "") {
      this.toastr.error('', 'Please Enter email Id', { timeOut: 1500 });
      this.SpinnerService.hide();
      return false;
    }
    if (this.UserCreation.value.phone_no === "") {
      this.toastr.error('', 'Please Enter Phone No', { timeOut: 1500 });
      this.SpinnerService.hide();
      return false;
    }

    this.userService.userCreationForm(this.UserCreation.value)
      .subscribe((res) => {
        if(res.id === undefined){
          this.notification.showError(res.description)
          this.SpinnerService.hide();
          return false;
        }
        else{
          this.notification.showSuccess("Created Successfully!...")
          this.SpinnerService.hide();
          this.router.navigate(['user/usersummary']);
        }

      },
      error => {
        this.errorHandler.handleError(error);
        this.SpinnerService.hide();
      }
      )
   
    
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  // generatePassword(passwordLength) {
  //   var numberChars = "0123456789";
  //   var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   var lowerChars = "abcdefghijklmnopqrstuvwxyz";
  //   var allChars = numberChars + upperChars + lowerChars;
  //   var randPasswordArray = Array(passwordLength);
  //   randPasswordArray = allChars.split('');
  //   console.log("k",randPasswordArray)

  //   var newPassword = '';
  //   for (var i = 0; i < this.passwordLength; i++) {
  //     newPassword +=
  //       randPasswordArray[Math.floor(Math.random() * randPasswordArray.length)];
  //   }
  //   console.log('jjj', newPassword);
  //   newPassword = newPassword;
  //   this.UserCreation.patchValue({
  //     password:newPassword
  //   })
  // }


  onCancelUser(){
    this.router.navigate(['user/usersummary']);
  }

  // onCancelUser() {
  //   this.router.navigate(['/usercreation/usersummary'], { skipLocationChange: true });
  // }

}
