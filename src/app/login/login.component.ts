import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VowService } from '../service/vow.service';
import { NotificationService } from '../service/notification.service'
import { environment } from 'src/environments/environment';
import { VowSharedService} from '../service/vow-shared.service'
import { ToastrService } from 'ngx-toastr';
import { pincode} from 'src/app/service/vow'
import { city}  from 'src/app/service/vow'
import { district}  from 'src/app/service/vow'
import { state}  from 'src/app/service/vow'
import { MasterService} from 'src/app/service/master.service'
import { debounceTime, distinctUntilChanged, tap, filter, switchMap, finalize, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  envData = environment

  VowloginForm: FormGroup;
  signupForm:FormGroup;
  portalForm:FormGroup;

  pinCodeList: Array<pincode>;
  cityList: Array<city>;
  stateList: Array<state>;
  districtList: Array<district>;
  EntityList:any;
  inputGstValue = "";
  inputPanValue = "";
  entityID:any;

  returnUrl: string
  hide = true;
  hided = true;



  constructor(public vowService: VowService, private router: Router, private notification: NotificationService,private masterservice:MasterService,
    private formBuilder: FormBuilder, private route: ActivatedRoute, private vowShareService: VowSharedService,private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.VowloginForm = this.formBuilder.group({
      entity_id:[''],
      user: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
    });



    this.signupForm = this.formBuilder.group({
      entity_id:[''],
      name: ['', Validators.compose([
        Validators.required
      ])],
      company_name:[''],
      pan_no: ['', [Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
      gst_no: ['', [Validators.pattern('^([0][1-9]|[1-2][0-9]|[3][0-7])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$')]],
      email:['', [Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone_no:[''],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
      repassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],
    });




    this.portalForm = this.formBuilder.group({
      name: ['', Validators.required],
      pan_no: [''],
      gst_no: [''],
      phone_no:[''],
      address: this.formBuilder.group({
      line1: ['', Validators.required],
      pincode_id: ['', Validators.required],
      city_id: ['', Validators.required],
      district_id: ['', Validators.required],
      state_id: ['', Validators.required],
      line2: [''],
      line3: [''],
    }),
    contact: this.formBuilder.group({
      designation: ['', Validators.required],
      email: ['', [ 
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobile_1: ['',Validators.required],
      mobile_2: [''],
      name: ['', Validators.required],
    }),

  })
  

    
    this.entity_List();
  }


// entity list
  entity_List() {
    this.masterservice.getEntity_List()
      .subscribe((results: any[]) => {
        let datas = results["data"];
        console.log("enty-list", datas)
        this.EntityList = datas;
      })
  }

  // select entity Id
  select_entityId(data) {
    this.entityID = data.id
    console.log("entity-id", this.entityID)
    this.vowShareService.entityID.next(this.entityID);
  }

  VowloginSubmit() {
    if (this.VowloginForm.value.user === "") {
      this.toastr.error('Please Enter User Name');
      // this.SpinnerService.hide();
      return false;
    }
    if (this.VowloginForm.value.password === "") {
      this.toastr.error('Please Enter Password');
      // this.SpinnerService.hide();
      return false;
    }
    let VowLoginData = this.VowloginForm.value
    console.log("login data", VowLoginData)
    console.log("before login response ", this.vowService.isAuthenticated)
    this.vowService.createLogin(VowLoginData)
    .subscribe((res) => {
      console.log("login",res)
      if(res.token){
        console.log("after login response ", this.vowService.isAuthenticated)
        this.vowService.isAuthenticated = true
        this.vowService.process = false
        localStorage.setItem("UserData", JSON.stringify(res))
        this.envData.apiToken = res.token 
        this.router.navigate(['/welcome']);
        this.vowShareService.vendorID.next(res.vendor_id);
        this.vowShareService.loginResult.next(res);
        console.log("after assign login response ", this.vowService.isAuthenticated)
      } else {
        this.notification.showError(res.description)
        this.vowService.process = false
        return false;
      }
      
  })


  }

  isSignUpPage:boolean = false
  isUserPage:boolean = true

  registerclick(){
    this.isSignUpPage = true;
    this.isUserPage = false;
  }
 
  onCancelSIgnIn(){
    this.isSignUpPage = false;
    this.isUserPage = true;
  }

  signINSubmit(){
    if (this.signupForm.value.name === "") {
      this.toastr.error('Please Enter User Name');
      // this.SpinnerService.hide();
      return false;
    }
    if (this.signupForm.value.email === "") {
      this.toastr.error('Please Enter Email Address');
      // this.SpinnerService.hide();
      return false;
    }
    if (this.signupForm.value.phone_no === "") {
      this.toastr.error('Please Enter Phone Number');
      // this.SpinnerService.hide();
      return false;
    }
    if (this.signupForm.value.password === "") {
      this.toastr.error('Please Enter Password');
      // this.SpinnerService.hide();
      return false;
    }
    this.vowService.signIn(this.signupForm.value)
    .subscribe((res) => {
      console.log("sign IN",res)
      if(res.name){
      this.vowService.process = false
      this.isSignUpPage = false;
      this.isUserPage = true;
      this.VowloginForm.patchValue({
        user:res.code,
      })
      this.notification.showSuccess("Created Successfully")
      }else {
        this.notification.showError(res.description)
        this.vowService.process = false
        return false;
      }    
  })

  }


  branchCreateForm(){

  }

  get contactform(){
    return this.portalForm.controls['contact'] as FormGroup
  }

  get addressform(){
    return this.portalForm.controls['address'] as FormGroup
  }


  isLoading=false;
  pincodename(){
    let pincodekeyvalue: String = "";
    this.getPinCode(pincodekeyvalue);

    // this.portalForm.controls.address.value.pincode_id.valueChanges
    this.portalForm.controls.address.get('pincode_id').valueChanges
    // this.portalForm.controls['address'].get('pincode_no').valueChanges
    // this.portalForm.get("address")['controls'].get("pincode_no").valueChanges
    // (this.CandidateAddress.get('address') as FormArray).at(i).get('pincode_no').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
          console.log('inside tap')

        }),

        switchMap(value => this.masterservice.get_PinCode(value,1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.pinCodeList = datas;

      })

    }

  

    // city
    cityname(){
    let citykeyvalue: String = "";
    this.getCity(citykeyvalue);
    this.portalForm.controls.address['controls'].get('city_id').valueChanges
    // (this.CandidateAddress.get('address') as FormArray).at(i).get('city_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(value => this.masterservice.get_City(value,1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.cityList = datas;

      })
    }


    districtname(){
    let districtkeyvalue: String = "";
    this.getDistrict(districtkeyvalue);
    this.portalForm.controls.address['controls'].get('district_id').valueChanges
    // (this.CandidateAddress.get('address') as FormArray).at(i).get('district_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(value => this.masterservice.get_District(value,1)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.districtList = datas;

      })

    }


    statename(){
      let statekeyvalue: String = "";
      this.getState(statekeyvalue);
      this.portalForm.controls.address['controls'].get('state_id').valueChanges
      // (this.CandidateAddress.get('address') as FormArray).at(i).get('state_id').valueChanges
        .pipe(
          debounceTime(100),
          distinctUntilChanged(),
          tap(() => {
            this.isLoading = true;
            console.log('inside tap')
  
          }),
  
          switchMap(value => this.masterservice.get_State(value,1)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            )
          )
        )
        .subscribe((results: any[]) => {
          let datas = results["data"];
          this.stateList = datas;
  
        })
      }



      public displayFnpin(pintype?: pincode): string | undefined {
        return pintype ? pintype.no : undefined;
      }
  
  
      public displaycit(autocit?: city): string | undefined {
        return autocit ? autocit.name : undefined;
      }
  
    
    public displaydis(autodis?: district): string | undefined {
        return autodis ? autodis.name : undefined;
      }
  
  
      public displayFnstate(statetype?: state): string | undefined {
        return statetype ? statetype.name : undefined;
      }



      private getPinCode(pincodekeyvalue) {
        this.masterservice.get_PinCode(pincodekeyvalue,1)
          .subscribe((results: any[]) => {
            let datas = results["data"];
            this.pinCodeList = datas;
          })
      }
  
  
      private getCity(citykeyvalue) {
        this.masterservice.get_City(citykeyvalue,1)
          .subscribe((results: any[]) => {
            let datas = results["data"];
            this.cityList = datas;
            // console.log("city", datas)
    
          })
      }
    
      private getDistrict(districtkeyvalue) {
        this.masterservice.get_District(districtkeyvalue,1)
          .subscribe((results: any[]) => {
            let datas = results["data"];
            this.districtList = datas;
            // console.log("district", datas)
    
          })
      }
    
      private getState(statekeyvalue) {
        this.masterservice.get_State(statekeyvalue,1)
          .subscribe((results: any[]) => {
            let datas = results["data"];
            this.stateList = datas;
            // console.log("state", datas)
    
          })
      }



































  error_messages = {
    'user': [
      { type: 'required', message: 'UserCode is required.' },
    ],

    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number'}
    ],
  }





}