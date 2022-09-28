import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms'
import { UserDetailsService} from '../user-details.service'
import { Router } from '@angular/router'
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent implements OnInit {

  UserCreation:FormGroup;
  passwordLength: Number = 6;
  roleTypeList:any;

  constructor(private fb: FormBuilder,private userService: UserDetailsService,private router: Router,private notification: NotificationService) { }

  ngOnInit(): void {
    this.UserCreation  = this.fb.group({
      name: [''],
      password: [''],
      role: [''],
      email:['', [Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  });

  this.GetRole();
  }

  
  GetRole() {
    this.userService.getRole_Type()
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.roleTypeList = datas;
      })
  }


  // password = ''


  
  

  
    //user creation
    submit_user_Creation() {

    this.userService.userCreationForm(this.UserCreation.value)
      .subscribe((res) => {
        console.log("user",res)
        if(res.code)  {
          this.notification.showSuccess("Created Successfully!...");
          this.router.navigate(['branchdetails/branchsummary']);
        }else{
            this.notification.showError(res.description)
            return false;
          
        }
      })
   
    
  }



  generatePassword(passwordLength) {
    var numberChars = "0123456789";
    var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowerChars = "abcdefghijklmnopqrstuvwxyz";
    var allChars = numberChars + upperChars + lowerChars;
    var randPasswordArray = Array(passwordLength);
    randPasswordArray = allChars.split('');
    console.log("k",randPasswordArray)

    var newPassword = '';
    for (var i = 0; i < this.passwordLength; i++) {
      newPassword +=
        randPasswordArray[Math.floor(Math.random() * randPasswordArray.length)];
    }
    console.log('jjj', newPassword);
    newPassword = newPassword;
    this.UserCreation.patchValue({
      password:newPassword
    })
  }


  onCancelUser(){
    this.router.navigate(['user/usersummary']);
  }

}
