import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VowService } from 'src/app/service/vow.service';
import { NotificationService } from 'src/app/service/notification.service'
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { pincode} from 'src/app/service/vow'
import { city}  from 'src/app/service/vow'
import { district}  from 'src/app/service/vow'
import { state}  from 'src/app/service/vow'
import { MasterService} from 'src/app/service/master.service'
import { BranchDetailsService } from '../branch-details.service';
import { VowSharedService } from 'src/app/service/vow-shared.service';
import { BranchDetailsShareService } from '../branch-details-share.service';
import { debounceTime, distinctUntilChanged, tap, filter, switchMap, finalize, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.component.scss']
})
export class CreateBranchComponent implements OnInit {
  envData = environment

  portalForm:FormGroup;
  pinCodeList: Array<pincode>;
  cityList: Array<city>;
  stateList: Array<state>;
  districtList: Array<district>;
  cityId: number;
  districtId: number;
  stateId: number;
  stateName_: string;
  pincodeId: number;
  branch_Id:number;
  get_branchList:any;
  branch_code:any;
  Line1 =""
  Line2 = ""
  Line3 = ""
  Pincode = ""
  City = ""
  District =""
  State =""
  Designation =""
  cname = ""
  cmobile =""
  cmobile2 =""
  Email = ""

  constructor(public vowService: VowService, private router: Router, private notification: NotificationService,private masterservice:MasterService,
    private formBuilder: FormBuilder, private route: ActivatedRoute,private toastr: ToastrService, 
    private branchdetailservice: BranchDetailsService, private VowSharedService: VowSharedService, private branchDetailshare : BranchDetailsShareService 
    ) { }

  ngOnInit(): void {
    // login response
    let result:any= this.VowSharedService.branchDetailScreen_loginResult.value
    this.branch_Id =  result.branch_id;
    console.log("branch-id",this.branch_Id)

    this.portalForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      pan_no: [''],
      gst_no: [''],
      phone_no:[''],

      address_id: this.formBuilder.group({
      id: [''],
      line1: ['', Validators.required],
      pincode_id: ['', Validators.required],
      city_id: ['', Validators.required],
      district_id: ['', Validators.required],
      state_id: ['', Validators.required],
      line2: [''],
      line3: [''],
    }),
    contact_id: this.formBuilder.group({
      id: [''],
      designation: ['', Validators.required],
      email: ['', [ 
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobile_1: ['',Validators.required],
      mobile_2: [''],
      name: ['', Validators.required],
    }),

  })


  // branch summary
  let data:any = this.branchDetailshare.branchView.value
  this.branch_code = data.code
  
  
  // this.Get_branch_patch();
  this.getBranchParticularData();
  }


  branch_id:any;
  getBranchParticularData() {
    this.branchdetailservice.getBranchParticularData(this.branch_code)
      .subscribe(result => {
          let data = result
          this.branch_id = result.id;
          console.log("branch-view", data)
          let Code = data.code;
          let Name = data.name;
          let Gst = data.pan_no;
          let Pan = data.gst_no;
          let Phone = data.phone_no;


          
          // let Address = data.address_id;
          // // let addressId = Address.id;
          // let Line1 = Address.line1;
          // let Line2 = Address.line2;
          // let Line3 = Address.line3;
          // let pincode = data.address.pincode_id
          // let city = data.address.city_id
          // let district = data.address.district_id
          // let state = data.address.state_id

          // let Contact = data.contact_id;
          // // let contactId = Contact.id;
          // let cname = Contact.name;
          // let cmail = Contact.email;
          // let cmobile = Contact.mobile_1;
          // let cmobile2 = Contact.mobile_2;
          
          // if(data.address_id != null){
          //   let Address = data.address_id;
          // }
          
          // let addressId = Address.id;
          // if(data.address_id !=null){
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
              this.Pincode = data.address_id.pincode_id
            }
            if(data.address_id.city_id != null){
              this.City = data.address_id.city_id
            }
            if(data.address_id.district_id != null){
              this.District = data.address_id.district_id
            }
            if(data.address_id.state_id != null){
              this.State = data.address_id.state_id
            }
          // }
         

          // if(data.contact_id != null){
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

          // }

         
        
          
          this.portalForm.patchValue({
            "id":this.branch_id,
            "name": Name,
            "pan_no": Pan,
            "gst_no": Gst,
            "phone_no": Phone,
            address_id: {
              "line1": this.Line1,
              "line2": this.Line2,
              "line3": this.Line3,
              "pincode_id": this.Pincode,
              "city_id": this.City,
              "district_id": this.District,
              "state_id": this.State,
              "id": data.address_id.id,
            },
            contact_id: {
              "designation": this.Designation,
              "name": this.cname,
              "email": this.Email,
              "mobile_1": this.cmobile,
              "mobile_2": this.cmobile2,
              "id": data.contact_id.id,
            },

     
           
          })

      })
  }






























  Get_branch_patch() {

    this.branchdetailservice.Get_branch_patch(this.branch_Id)
      .subscribe((results: any[]) => {
          console.log("get_branch_patch", results)
          let datas = results["data"];
          this.get_branchList = datas;
      })
   
    
  }

  // this.branch_Id

  get contactform(){
    return this.portalForm.controls['contact_id'] as FormGroup
  }

  get addressform(){
    return this.portalForm.controls['address_id'] as FormGroup
  }


  isLoading=false;
  pincodename(){
    let pincodekeyvalue: String = "";
    this.getPinCode(pincodekeyvalue);

    // this.portalForm.controls.address.value.pincode_id.valueChanges
    this.portalForm.controls.address_id.get('pincode_id').valueChanges
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
    this.portalForm.controls.address_id.get('city_id').valueChanges
    // this.portalForm.controls.address['controls'].get('city_id').valueChanges
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
    this.portalForm.controls.address_id.get('district_id').valueChanges
    // this.portalForm.controls.address['controls'].get('district_id').valueChanges
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
      this.portalForm.controls.address_id.get('state_id').valueChanges
      // this.portalForm.controls.address['controls'].get('state_id').valueChanges
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






      branchCreateForm() {

        if (this.portalForm.value.contact_id.name === "") {
          this.toastr.error('Please Enter Contact Name');
          return false;
        }
       
        if (this.portalForm.value.contact_id.designation === "") {
          this.toastr.error('Please Select Designation Name');
          return false;
        }
        if (this.portalForm.value.contact_id.mobile_1 === "") {
          this.toastr.error('Please Enter Mobile 1');
          return false;
        }
       
        if (this.portalForm.value.address_id.line1 === "") {
          this.toastr.error('Please Enter Line1');
          return false;
        }
        
        if (this.portalForm.value.address_id.pincode_id === "" || this.portalForm.controls.address_id.value.pincode_id.id === undefined) {
          this.toastr.error('Please Select Valid Pincode');
          return false;
        }
        if (this.portalForm.value.address_id.city_id === "" || this.portalForm.controls.address_id.value.city_id.id === undefined) {
          this.toastr.error('Please Select Valid city');
          return false;
        }
        if (this.portalForm.value.address_id.district_id === "" || this.portalForm.controls.address_id.value.district_id.id === undefined) {
          this.toastr.error('Please Select Valid district');
          return false;
        }
        if (this.portalForm.value.address_id.state_id === "" || this.portalForm.controls.address_id.value.state_id.id === undefined) {
          this.toastr.error('Please Select Valid state');
          return false;
        }



        
        this.portalForm.controls.address_id.value.city_id = this.portalForm.controls.address_id.value.city_id.id
        this.portalForm.controls.address_id.value.state_id = this.portalForm.controls.address_id.value.state_id.id
        this.portalForm.controls.address_id.value.district_id = this.portalForm.controls.address_id.value.district_id.id
        this.portalForm.controls.address_id.value.pincode_id = this.portalForm.controls.address_id.value.pincode_id.id
        
        this.branchdetailservice.branchFormCreate(this.portalForm.value)
          .subscribe((res) => {
            console.log("branch create",res)
            if(res.id==undefined)  {
              this.notification.showError(res.description)
              return false;
            }else{
              this.notification.showSuccess("Updated Successfully!...");
              this.router.navigate(['branchdetails/branchsummary']);
              
            }
          }
          )
       
        
      }

      pinCode(data) {
        this.cityId = data.city;
        this.districtId = data.district;
        this.stateId = data.state;
        this.pincodeId = data
        this.portalForm.patchValue({
          address_id: {
            city_id: this.cityId,
            district_id: this.districtId,
            state_id: this.stateId,
            pincode_id: this.pincodeId
          }
        })
      } 


      oncancelBranch(){
        this.router.navigate(['branchdetails/branchsummary']);
      }
    


}
