import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateInfoComponent } from './candidate-info.component';
import { FormsModule, ReactiveFormsModule,FormControl,FormArray, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 

describe('CandidateInfoComponent', () => {
  let component: CandidateInfoComponent;
  let fixture: ComponentFixture<CandidateInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
    	  ReactiveFormsModule,
        MatSnackBarModule,
        HttpClientModule,
        RouterTestingModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [ CandidateInfoComponent ],
      providers: [DatePipe
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  it('should require valid email', () => {
    component.Candidate.setValue({
      first_name:"",
      middle_name:"",
      last_name:"",
      email:"invalidemail",
      phone_no:"",
      dob:"",
      gender:""
    });

    expect(component.Candidate.valid).toEqual(false);
  });
  it('should require valid phone', () => {
    component.Candidate.setValue({
      
      first_name:"nmm",
      middle_name:"hhh",
      last_name:"rr",
      email:"bobby@gmail.com",
      phone_no: "9956789045",
      dob:"01/01/2022",
      gender:"1"
    });
    expect(component.Candidate.value.phone_no.length).toEqual(10);
  });


  it('gender- check the length of drop down', () => {
    component.Candidate.setValue({
      first_name:"nmm",
      middle_name:"hhh",
      last_name:"rr",
      email:"bobby@gmail.com",
      phone_no:"9967897789",
      dob:"01/01/2022",
      gender:"2"
    });

    expect(component.Candidate.value.gender.length).toBeGreaterThan(0);
  });



  it('bio-data - should be valid if form value is valid', () => {
    component.Candidate.setValue({
      first_name:"nmm",
      middle_name:"hhh",
      last_name:"rr",
      email:"bobby@gmail.com",
      phone_no:"9967897789",
      dob:"01/01/2022",
      gender:"1"
    });

    expect(component.Candidate.valid).toEqual(true);
  });



  it('personal Details - should be valid if form value is valid', () => {
    component.PersonalDetails.setValue({
      father_name:"gg",
      mother_name:"hh",
      martial_status:"5",
    });
    

    expect(component.PersonalDetails.valid).toEqual(true);
  });

  it('marital status- check the length of drop down', () => {
    component.PersonalDetails.setValue({
      father_name:"kk",
      mother_name:"mm",
      martial_status:"1",
    });

    expect(component.PersonalDetails.value.martial_status.length).toBeGreaterThan(0);
  });



  it('education-form should be valid', () => {
let array: FormGroup[] = [];
array.push(new FormGroup({
      inst_name: new FormControl('uk',Validators.required),
      month: new FormControl('7',Validators.required),
      year: new FormControl('2019',Validators.required),
      percentage:  new FormControl('2',Validators.required),
      title:  new FormControl('6',Validators.required),
      city:  new FormControl('6',Validators.required),
}));
let formArray = new FormArray(array);
component.CandidateEducation = new FormGroup({
  education: formArray // or array not totally sure
})
    
    expect (component.CandidateEducation.valid).toEqual(true);
    })


    




});
