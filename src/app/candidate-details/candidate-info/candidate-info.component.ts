import { Component, EventEmitter, Injectable, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { CandidateDetailsService} from "../candidate-details.service"
import { formatDate, DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, tap, filter, switchMap, finalize, takeUntil, map } from 'rxjs/operators';
import { MasterService} from '../../service/master.service'
import { Router } from '@angular/router'
import { VowSharedService} from '../../service/vow-shared.service'
import { ErrorHandlingService} from '../../service/error-handling.service'
import { SharedModule } from '../../shared/shared.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
// import { VowvalidatenumberDirective } from 'src/app/shared/vowvalidatenumber.directive'; 
import { NotificationComponent } from 'src/app/notification/notification.component';
import { pincode} from '../../service/vow'
import { city} from '../../service/vow'
import { district} from '../../service/vow'
import { state} from '../../service/vow'

// export interface pincode {
//   no: string;
//   id: number;
// }

// export interface city {
//   id: string;
//   name: string;
// }

// export interface district {
//   id: string;
//   name: string;
// }

export interface degree {
  name: string;
  id: number;
}
export interface stream {
  name: string;
  id: number;
}


@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.scss'],
  providers: [NotificationComponent,{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false, showError: true }
  }]
})
export class CandidateInfoComponent implements OnInit {
  @Output() childMessagetwo = new EventEmitter<{type: string, AlertMessage: string}>();
  @ViewChild('fileInput') fileInput: any;
  isLinear = true;

  Candidate : FormGroup;
  CandidateAddress : FormGroup;
  CandidateEducation : FormGroup;
  CandidateExperience : FormGroup;
  Document: FormGroup;
  PersonalDetails: FormGroup;
  candidate_infocode:any;
  yearlist: any;
  isLoading = false;
  Candidate_Id:any;
  addressarray:any;
  educationarray:any;
  experiencearray:any;
  pinCodeList: Array<pincode>;
  cityList: Array<city>;
  stateList: Array<state>;
  degreeList: Array<degree>;
  streamList: Array<stream>;
  districtList: Array<district>;
  images:string  []  =  [];
  abcd = 'swathi';
  xyz= 'priya';
  mnop= 'N';
  ss= 'rss@gmail.com';
  gmm= '9988556789';
  datevalue= '01.01.2022'
  gender= 'female'
  lineName1 = 'No.40/34 Narayanaswamy ';
  lineName3= '1st Cross Street';
  lineName2= '2nd Main Road';
  cityName= 'T.Nagar';
  districtName= 'Chennai';
  stateName= 'TamilNadu'
  pinCode= '600017'
  genderList =[{id: 1,text: "Male"},{id: 2,text: "Female"},{id: 3,text: "Others"},]
  typeList :any;
  statusList = [  {id: 1,text: "Single"},{id: 2,text: "Married"}]
  addressList =[{id: 1,text: "Temporary Address"},{id: 2,text: "Permanent Address"}]
  dataMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  limit = 10;
  offset = 0;
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;


  


  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private candidateService: CandidateDetailsService,
    private datePipe: DatePipe,private masterservice:MasterService,private router: Router, private shareservice: VowSharedService,
    private errorHandler :ErrorHandlingService, private notify: NotificationComponent) { 
     }




  ngOnInit() {
    this.Candidate  = this.fb.group({
      first_name:['',Validators.required],
      middle_name:"",
      last_name:['',Validators.required],
      email:['', [Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone_no:[""],
      dob:[""],
      gender:[""],
  });

  this.CandidateAddress = this.fb.group({
    address: new FormArray([
      this.getcandidateInfoAddressType(1),
      this.getcandidateInfoAddressType(2)
    ])
  });

  this.CandidateEducation = this.fb.group({
    education: new FormArray([
      this.getcandidateeducation()
    ])
  });


  this.CandidateExperience = this.fb.group({
    experience: new FormArray([
      this.getcandidateexperience()
    ])
  });

  this.Document  = this.fb.group({
    type: [''],
  });

  this.PersonalDetails  = this.fb.group({
    father_name:[''],
    mother_name:[''],
    martial_status:[''],
    // nationality:"",
    // hobby:""
    
});

  
  this.DatePopulation();
  // this.myStepper.selected.completed = true;
  // this.myStepper.next();

  // this.getCandidateEdit();
  // this.getAddressEdit();
  // this.getWorkExperienceEdit();
  // this.getWorkEducationEdit();
  // this.getPersonalDetailsEdit();
  this.document_Type();
  }


  document_Type() {
    this.candidateService.getDocument_Type()
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.typeList = datas;
      })
  }


  step = 0;
  setStep(index: number) {
    this.step = index;
  }


  DatePopulation() {
    console.log('---------------->');
    let date = new Date();
    // console.log(date);

    let year = date.getFullYear();
    // console.log(year);
    let max = year - 72;
    // console.log(max);
    let arr = [];

    for (let i = max; i < year; i++) {
      // console.log(i + 1);
      arr.push(i + 1);
    }
    let dataset = arr.reverse();
    // console.log('--->', dataset);
    this.yearlist = dataset;
    // console.log("yerrrrrr", this.yearlist)
  }
 

  getcandidateInfoAddressType(type){
    let address = this.fb.group({
      line1: new FormControl(''),
      line2:  new FormControl(''),
      line3:  new FormControl(''),
      type:  new FormControl(type),
      state_id: new FormControl(''),
      district_id: new FormControl(''),
      city_id:  new FormControl(''),
      pincode_no:  new FormControl('')
    })
    return address
    }

    getcandidateeducation(){
      let education = this.fb.group({
        inst_name: new FormControl(''),
        month: new FormControl(''),
        year: new FormControl(''),
        percentage:  new FormControl(''),
        title:  new FormControl(''),
        city:  new FormControl(''),
        degree: new FormControl(''),
        stream: new FormControl('')
      })
      return education
    }

    getcandidateexperience(){
      let experience = this.fb.group({
        company: new FormControl(''),
        work_experience: new FormControl(''),
        role:  new FormControl(''),
        city:  new FormControl(''),
        doj:  new FormControl(''),
        dor:  new FormControl(''),
      })
      return experience
    }

  

  onFileSelectForRaiseReq(e){

  }

  addEducation() {
    const control = <FormArray>this.CandidateEducation.get('education');
    control.push(this.getcandidateeducation());
  }
  addExperience() {
    const control = <FormArray>this.CandidateExperience.get('experience');
    control.push(this.getcandidateexperience());
  }

  removeeducation(i) {
    const control = <FormArray>this.CandidateEducation.get('education');
    control.removeAt(i);
  }

  removeexp(i) {
    const control = <FormArray>this.CandidateExperience.get('experience');
    control.removeAt(i);
  }


  SubmitCandidate(){
    let candidateData = this.Candidate.value 

    alert(JSON.stringify(candidateData))


  }

// candidate bio
  submit_candidate_bio() {
    // this.router.navigate(['errorroute'])
    // this.router.navigateByUrl('/errorroute');

    const dateValue = this.Candidate.value;
    dateValue.dob = this.datePipe.transform(dateValue.dob, 'yyyy-MM-dd');
          
    this.candidateService.candidate_bio(this.Candidate.value)
      .subscribe((res) => {
        console.log("bio",res)
        if(res.id === undefined){
          // this.router.navigateByUrl('/errorroute');
          // this.notification.showError(res.description)
          // this.SpinnerService.hide();
          // return false;
        } 
        else {
        this.Candidate_Id = res.id
        this.candidate_infocode = res.code
          // this.notification.showSuccess("saved Successfully!...")
          // this.SpinnerService.hide();
          // this.shareService.vendorView.next(res);
          // this.router.navigate(['/atma/vendorView'], { skipLocationChange: true })
        }
      },
      error => {

        // this.router.navigate(['errorroute', '/candidateinfo'])
        // this.shareservice.catcherror.next(error);
        // this.router.navigateByUrl('/errorroute');
        this.errorHandler.handleError(error);
        // this.SpinnerService.hide();
      }
        
      )
   
    
  }

  // personal details
  submit_personal_details() {

    this.candidateService.candidate_personaldetails(this.PersonalDetails.value,this.Candidate_Id)
      .subscribe((res) => {
        console.log("personaldetail",res)
        this.Candidate_Id = res.id
      })
   
    
  }

  address_copy(){
    let index = 1;
    let datas = this.CandidateAddress.value.address[0]

    console.log("dd", datas)
    let oneline = datas.line1;
    let twoline = datas.line2;
    let threeline = datas.line3;
    let city = datas.city_id;
    let dis = datas.district_id;
    let state = datas.state_id;
    let pin = datas.pincode_no;

    this.CandidateAddress.get("address")['controls'][index].get("line1").setValue(oneline)
    this.CandidateAddress.get("address")['controls'][index].get("line2").setValue(twoline)
    this.CandidateAddress.get("address")['controls'][index].get("line3").setValue(threeline)
    this.CandidateAddress.get("address")['controls'][index].get("city_id").setValue(city)
    this.CandidateAddress.get("address")['controls'][index].get("district_id").setValue(dis)
    this.CandidateAddress.get("address")['controls'][index].get("state_id").setValue(state)
    this.CandidateAddress.get("address")['controls'][index].get("pincode_no").setValue(pin)
  }
  // candidate address
  submit_candidate_address(){
    let details = this.CandidateAddress.value
    this.addressarray = details.address

    for(let i=0;i<this.addressarray.length;i++){
      this.addressarray[i].pincode_no = this.addressarray[i].pincode_no.id
      this.addressarray[i].city_id = this.addressarray[i].city_id.id
      this.addressarray[i].district_id = this.addressarray[i].district_id.id
      this.addressarray[i].state_id = this.addressarray[i].state_id.id
      this.addressarray[i].city_id = this.addressarray[i].city_id.id
    }
     
    this.candidateService.candidate_address(this.addressarray,this.Candidate_Id)
    .subscribe((res) => {
      console.log("address",res)
    })

  }

   // candidate education
   submit_candidate_education(){
    let details = this.CandidateEducation.value
    this.educationarray = details.education


    for(let i=0;i<this.educationarray.length;i++){
      this.educationarray[i].degree = this.educationarray[i].degree.id
      this.educationarray[i].stream = this.educationarray[i].stream.id
    }
  
    this.candidateService.candidate_education(this.educationarray,this.Candidate_Id)
    .subscribe((res) => {
      console.log("education",res)
    })

  }

    // candidate experience
    submit_candidate_experience(){
      let details = this.CandidateExperience.value
      this.experiencearray = details.experience

      for(let i=0;i<this.experiencearray.length;i++){
      this.experiencearray[i].doj = this.datePipe.transform(this.experiencearray[i].doj, 'yyyy-MM-dd'); 
      this.experiencearray[i].dor = this.datePipe.transform(this.experiencearray[i].dor, 'yyyy-MM-dd');     
      }
    
      this.candidateService.candidate_experience(this.experiencearray,this.Candidate_Id)
      .subscribe((res) => {
        console.log("experience",res)
      })
  
    }

    // candidate document
    submit_DOC() {
      // this.SpinnerService.show();
      console.log("doc-submit", this.docFunctionList)
  
      // if(this.docFunctionList.length == 0){
      //   // this.toastr.error('Please Fill All Details');
      //   // this.SpinnerService.hide();
      //   // return false;
      // }
  
      let count= 1
      for(let i=0;i<this.docFunctionList.length;i++)
      {
        this.docFunctionList[i].attachment = 'file' + count++
      }
      console.log("ffff", this.docFunctionList)
  
  
      for(let i=0;i<this.docFunctionList.length;i++)
      {
        if(this.docFunctionList[i].type.id != undefined){
          this.docFunctionList[i].type =this.docFunctionList[i].type.id;
        }
      }
      console.log("docgp", this.docFunctionList)
  
  
      let dataset = this.docFunctionList
      const formData: FormData = new FormData();
      let datavalue = JSON.stringify(dataset)
      formData.append('data', datavalue);
  
      for(let i=0;i<this.docFunctionList.length;i++)
      {
        let string_value = this.docFunctionList[i].attachment
        let file_list = this.docFunctionList[i].filekey
        for (let individual in file_list) {
          formData.append(string_value, file_list[individual])
        }
  
      }
  
  
  
      
      // if (this.DocumentAddForm.value.docgroup_id.id==undefined||this.DocumentAddForm.value.docgroup_id.id<=0  ){
      //   this.toastr.error('Please Select DocumentGroup Name');
      //   this.SpinnerService.hide();
      //   return false;
      // }
      // if (this.DocumentAddForm.value.period ===""){
      //   this.toastr.error('Please Enter Period');
      //   this.SpinnerService.hide();
      //   return false;
      // }
      
      
      this.candidateService.candidateDocument(formData,this.Candidate_Id)
      .subscribe(result => {
        console.log("result", result);
  
        // if (result.status == "success") {
        //   this.notification.showSuccess("Saved Successfully!...")
        //   this.SpinnerService.hide();
        //   this.onSubmit.emit();
        // } else {
        //   this.notification.showError(result.description)
        //   this.SpinnerService.hide();
        //   return false;
        // }
  
        //  if(result.id === undefined){
        //   this.notification.showError(result.description)
        //   this.SpinnerService.hide();
        //   return false;
        // }
        // else{
        //   this.notification.showSuccess("Saved Successfully!...")
        //   this.SpinnerService.hide();
        //   this.onSubmit.emit();
        // }
      }
      // ,
      // error => {
      //   this.errorHandler.handleError(error);
      //   this.SpinnerService.hide();
      // }
      )
    }



  //  review submit
    submit_candidateinfo(){
      let json = {
        "code":this.candidate_infocode
      }
    
      this.candidateService.candidateinfo(json)
      .subscribe((res) => {
        console.log("candidate--info",res)
      })

    }

    // pincode
    pincodename(i){
    let pincodekeyvalue: String = "";
    this.getPinCode(pincodekeyvalue);

    // this.CandidateAddress.controls.address['controls'].get('pincode_no').valueChanges
    // this.CandidateAddress.get("address")['controls'][index].get("pincode_no").valueChanges
    (this.CandidateAddress.get('address') as FormArray).at(i).get('pincode_no').valueChanges
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
    cityname(i){
    let citykeyvalue: String = "";
    this.getCity(citykeyvalue);

    (this.CandidateAddress.get('address') as FormArray).at(i).get('city_id').valueChanges
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


    districtname(i){
    let districtkeyvalue: String = "";
    this.getDistrict(districtkeyvalue);

    (this.CandidateAddress.get('address') as FormArray).at(i).get('district_id').valueChanges
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


    statename(i){
      let statekeyvalue: String = "";
      this.getState(statekeyvalue);
  
      (this.CandidateAddress.get('address') as FormArray).at(i).get('state_id').valueChanges
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




      fileChangeDoc(event) {
        this.images = [];
        for (var i = 0; i < event.target.files.length; i++) {
          this.images.push(event.target.files[i]);
        }
      }


 docFunctionList =[];
 adddocformarray(){
  //  if (this.docformarr.value.docgroup_id.id==undefined||this.docformarr.value.docgroup_id.id<=0  ){
  //     this.toastr.error('Please Select DocumentGroup Name');
  //     this.SpinnerService.hide();
  //     return false;
  //   }
  //   if (this.docformarr.value.period ===""){
  //     this.toastr.error('Please Enter Period');
  //     this.SpinnerService.hide();
  //     return false;
  //   }
  //   if(this.images.length == 0){
  //     this.toastr.error('', 'Choose Upload Files ', { timeOut: 1500 });
  //     this.SpinnerService.hide();
  //     return false;
    // }
 let dataArray = this.Document.value
 let data ={
  type:dataArray.type,
  attachment: "",
  filekey: this.images
 }
 
 console.log("dataArray",data)
 this.docFunctionList.push(data)
 console.log("array",this.docFunctionList)  

 this.Document.controls["type"].reset('');
 this.images = [];
 this.fileInput.nativeElement.value = ""
  }


  docListDelete(index: number) {
    this.docFunctionList.splice(index, 1);
    console.log("delete",this.docFunctionList)
  }

  



       // degree
       degreeName(i){
      let degreekeyvalue: String = "";
      this.getDegree(degreekeyvalue);
      (this.CandidateEducation.get('education') as FormArray).at(i).get('degree').valueChanges
        .pipe(
          debounceTime(100),
          distinctUntilChanged(),
          tap(() => {
            this.isLoading = true;
            console.log('inside tap')
  
          }),
  
          switchMap(value => this.masterservice.get_Degree(value,1)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            )
          )
        )
        .subscribe((results: any[]) => {
          let datas = results["data"];
          this.degreeList = datas;
  
        })
  
      }


      // stream
      streamname(i){
        let streamkeyvalue: String = "";
        this.getStream(streamkeyvalue);
        (this.CandidateEducation.get('education') as FormArray).at(i).get('stream').valueChanges
          .pipe(
            debounceTime(100),
            distinctUntilChanged(),
            tap(() => {
              this.isLoading = true;
              console.log('inside tap')
    
            }),
    
            switchMap(value => this.masterservice.get_Stream(value,1)
              .pipe(
                finalize(() => {
                  this.isLoading = false
                }),
              )
            )
          )
          .subscribe((results: any[]) => {
            let datas = results["data"];
            this.streamList = datas;
    
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
    public displayFnDegree(degreetype?: degree): string | undefined {
      return degreetype ? degreetype.name : undefined;
    }
    public displayStream(autostream?: stream): string | undefined {
      return autostream ? autostream.name : undefined;
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

    private getDegree(degreekeyvalue) {
      this.masterservice.get_Degree(degreekeyvalue,1)
        .subscribe((results: any[]) => {
          let datas = results["data"];
          this.degreeList = datas;
        })
    }

    private getStream(streamkeyvalue) {
      this.masterservice.get_Stream(streamkeyvalue,1)
        .subscribe((results: any[]) => {
          let datas = results["data"];
          this.streamList = datas;
        })
    }


    onScroll(event: any) {
      // visible height + pixel scrolled >= total height 
      console.log("hitts");
      // if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      //   console.log("End");
      // }
  }
  




  // pinCodeList = [
  //   { name: 'Bank A (Switzerland)', id: 'A' },
  //   { name: 'Bank B (Switzerland)', id: 'B' },
  //   { name: 'Bank C (France)', id: 'C' },
  //   { name: 'Bank D (France)', id: 'D' },
  //   { name: 'Bank E (France)', id: 'E' },
  //   { name: 'Bank F (Italy)', id: 'F' },
  //   { name: 'Bank G (Italy)', id: 'G' },
  //   { name: 'Bank H (Italy)', id: 'H' },
  //   { name: 'Bank I (Italy)', id: 'I' },
  //   { name: 'Bank J (Italy)', id: 'J' },
  //   { name: 'Bank Kolombia (United States of America)', id: 'K' },
  //   { name: 'Bank L (Germany)', id: 'L' },
  //   { name: 'Bank M (Germany)', id: 'M' },
  //   { name: 'Bank N (Germany)', id: 'N' },
  //   { name: 'Bank O (Germany)', id: 'O' },
  //   { name: 'Bank P (Germany)', id: 'P' },
  //   { name: 'Bank Q (Germany)', id: 'Q' },
  //   { name: 'Bank R (Germany)', id: 'R' }
  // ];




  showSnackbarTopPosition(content, action, duration) {
    // this.snackBar.open(content, action, {
    //   duration: 2000,
    //   verticalPosition: "top", // Allowed values are  'top' | 'bottom'
    //   horizontalPosition: "end", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    //   panelClass: ["custom-style"]
    // });
    this.notify.gettingMessage('success', "Hi")
  }


















  // update-------------------------------------------------------------------------------
  // candidate info update
  getCandidateEdit() {
    this.candidateService.getCandidate_bio(23)
      .subscribe(result => {
        console.log("get bio-data",result)
        let date_dob = this.datePipe.transform(result.dob, 'yyyy-MM-dd');

        this.Candidate.patchValue({
          first_name:result.first_name,
          middle_name:result.middle_name,
          last_name:result.last_name,
          email:result.email,
          phone_no:result.phone_no,
          dob: date_dob,
          gender:result.gender.id,
        })
      })

  }


  getaddressFormArray(): FormArray {
    return this.CandidateAddress.get('address') as FormArray;
  }


  // candidate Address update
  getAddressEdit() {
    while ((this.CandidateAddress.get('address') as FormArray).length) {
      (this.CandidateAddress.get('address') as FormArray).removeAt(0);
      (this.CandidateAddress.get('address') as FormArray).removeAt(1);
    }
    this.candidateService.getAddress(23)
      .subscribe(result => {
        console.log("get address",result)
        let details = result;
        for (let detail of details.data) {
          let line1: FormControl = new FormControl('');
          let line2: FormControl = new FormControl('');
          let line3: FormControl = new FormControl('');
          let type: FormControl = new FormControl('');
          let state_id: FormControl = new FormControl('');
          let district_id: FormControl = new FormControl('')
          let city_id: FormControl = new FormControl('')
          let pincode_no: FormControl = new FormControl('')

          line1.setValue(detail.line1);
          line2.setValue(detail.line2);
          line3.setValue(detail.line3);
          type.setValue(detail.type);
          state_id.setValue(detail.state_id);
          district_id.setValue(detail.district_id);
          city_id.setValue(detail.city_id);
          pincode_no.setValue(detail.pincode_no);
          this.getaddressFormArray().push(new FormGroup({
            line1: line1,
            line2: line2,
            line3: line3,
            type: type,
            state_id: state_id,
            district_id: district_id,
            city_id: city_id,
            pincode_no: pincode_no
          }))
        }
      
      })

  }




  getFormArray(): FormArray {
    return this.CandidateExperience.get('experience') as FormArray;
  }


  // candidate workexperience update
  getWorkExperienceEdit() {
    (this.CandidateExperience.get('experience') as FormArray).removeAt(0)
    this.candidateService.getWorkExperience(23)
      .subscribe(result => {
        console.log("get workexperience",result)
        let details = result;
        for (let detail of details.data) {
          let company: FormControl = new FormControl('');
          let role: FormControl = new FormControl('');
          let city: FormControl = new FormControl('');
          let doj: FormControl = new FormControl('');
          let dor: FormControl = new FormControl('');
          let work_experience: FormControl = new FormControl('')

          company.setValue(detail.company);
          role.setValue(detail.role);
          city.setValue(detail.city);
          let date_doj = this.datePipe.transform(detail.doj, 'yyyy-MM-dd');
          doj.setValue(date_doj);
          let date_dor = this.datePipe.transform(detail.dor, 'yyyy-MM-dd');
          dor.setValue(date_dor);
          work_experience.setValue(detail.work_experience);
          this.getFormArray().push(new FormGroup({
            company: company,
            role: role,
            city: city,
            doj: doj,
            dor: dor,
            work_experience: work_experience
          }))
        }
      
      })

  }


  geteducationFormArray(): FormArray {
    return this.CandidateEducation.get('education') as FormArray;
  }


  // candidate education update
  getWorkEducationEdit() {
    (this.CandidateEducation.get('education') as FormArray).removeAt(0)
    this.candidateService.getEducation(23)
      .subscribe(result => {
        console.log("get education",result)
        let details = result;
        for (let detail of details.data) {
          let inst_name: FormControl = new FormControl('');
          let month: FormControl = new FormControl('');
          let year: FormControl = new FormControl('');
          let percentage: FormControl = new FormControl('');
          let title: FormControl = new FormControl('');
          let city: FormControl = new FormControl('')

          inst_name.setValue(detail.inst_name);
          month.setValue(detail.month);
          year.setValue(detail.year);
          percentage.setValue(detail.percentage);
          title.setValue(detail.title);
          city.setValue(detail.city);
          this.geteducationFormArray().push(new FormGroup({
            inst_name: inst_name,
            month: month,
            year: year,
            percentage: percentage,
            title: title,
            city: city
          }))
        }
      
      })

  }



   // personal Details update
   getPersonalDetailsEdit() {
    this.candidateService.getPersonalDetails(4)
      .subscribe(result => {
        console.log("get personal Details",result)
        // let date_dob = this.datePipe.transform(result.dob, 'yyyy-MM-dd');

        this.PersonalDetails.patchValue({
          father_name: result.father_name,
          mother_name: result.mother_name,
          martial_status: result.martial_status.id,
        })
      })

  }

}

 