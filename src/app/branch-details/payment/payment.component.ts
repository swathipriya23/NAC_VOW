import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter,ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router'
import { debounceTime, distinctUntilChanged, tap, filter, switchMap, finalize,map, takeUntil } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable, from, fromEvent} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
// import { NgxSpinnerService } from "ngx-spinner";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BranchDetailsService } from '../branch-details.service';
import { NotificationService } from 'src/app/service/notification.service'
import { BranchDetailsShareService } from '../branch-details-share.service'; 


export interface paymode {
  id: string;
  name: string;
}
export interface bank {
  id: string;
  name: string;
}
export interface branch {
  ifsccode: string;
  id: string;
  name: string;
}
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {

    @ViewChild('branch_id') branch_id;
    @Output() onCancel = new EventEmitter<any>();
    @Output() onSubmit = new EventEmitter<any>();
    branchPayment: FormGroup;
    getBankbranchList:Array<branch>;
    account_type=[];
    branchrefid=0;
    payment_btn=false;
    bankList:Array<bank>;
    getPaymodeList: Array<paymode>;
    isLoading = false;
    subtax_btn=false;
    mainbid:any;
    has_next = true;
    has_previous = true;
    paymode_ddflag=false;
    currentpage: number = 1;
  
    @ViewChild('bankdata') matbankAutocomplete: MatAutocomplete;
    @ViewChild('bankInput') bankInput: any;
    @ViewChild('paymodedata') matpaymodeAutocomplete: MatAutocomplete;
    @ViewChild('paymodeInput') paymodeInput: any;
    @ViewChild('branchdata') matbranchAutocomplete: MatAutocomplete;
    @ViewChild('branchInput') branchInput: any;
    @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;
    
    ifsccodename: string;
    ifsccode: any;
    maxlength=18;
  
    constructor(private fb: FormBuilder,private router:Router,private notification: NotificationService,
      private branchdetailsService: BranchDetailsService,private branchDetailShareService: BranchDetailsShareService,
      private toastr: ToastrService) { }
    ngOnInit(): void {
      this.branchPayment = this.fb.group({
        supplier: ['', Validators.required],
        paymode_id: ['', Validators.required],
        bank_id: ['', ],
        branch_id: [''],
        account_type: [''],
        beneficiary: [''],
        account_no: ['',Validators.required ],
        remarks: [''],
        // mainbranchid:[this.mainbid,],
        bname:[''],
        bankname:['']
  
      })
      this.branchdetails();  
    }
    paymodetype(event){
  if(event.name=="DD"){
  this.paymode_ddflag=true
  
  this.branchPayment.get('branch_id').setValue('')
  this.branchPayment.get('bank_id').setValue('')
      this.branchPayment.get('bankname').setValue('')
       this.branchPayment.get('bname').setValue('')
       this.branchPayment.get('account_no').setValue('')
      this.branchPayment.get('account_type').setValue('')
  
  
  }
  else{
  this.paymode_ddflag=false;
  }
  
    }
    getpayname(){
      let query: String = "";
      this.getPaymode(query);
  
      this.branchPayment.get('paymode_id').valueChanges
        .pipe(
          debounceTime(100),
          distinctUntilChanged(),
          tap(() => {
            this.isLoading = true;
          
  
          }),
          switchMap(value => this.branchdetailsService.get_paymodeScroll(value,1)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            )
          )
        )
        .subscribe((results: any[]) => {
          let datas = results["data"];
          this.getPaymodeList = datas;
        
  
        })
    }
    getbanknames(){
      let query1: String = "";
      this.getBank(query1);
  
      this.branchPayment.get('bank_id').valueChanges
        .pipe(
          debounceTime(100),
          distinctUntilChanged(),
          tap(() => {
            this.isLoading = true;
            
  
          }),
          switchMap(value => this.branchdetailsService.get_bankScroll(value ,1)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            )
          )
        )
        .subscribe((results: any[]) => {
          let datas = results["data"];
          this.bankList = datas;
        
  
        })
  
  
    }
    getbranchnames(){
      let q: String = "";
      this.getBankbranch(this.branchrefid,q);
  
      this.branchPayment.get('branch_id').valueChanges
        .pipe(
          debounceTime(100),
          distinctUntilChanged(),
          tap(() => {
            this.isLoading = true;
            
  
          }),
          switchMap(value => this.branchdetailsService.branchdropdown(this.branchrefid,value,1)
            .pipe(
              finalize(() => {
                this.isLoading = false
              }),
            )
          )
        )
        .subscribe((results: any[]) => {
          let datas = results["data"];
          this.getBankbranchList = datas;
          console.log("branch",this.getBankbranchList)
        
  
        })
    }
  
    private getBank(q) {
      this.branchdetailsService.bankdropdown(q)
        .subscribe((results: any[]) => {
          let datas = results["data"];
          this.bankList = datas;
       
    
        })
    }
  
    bankScroll() {
      setTimeout(() => {
      if (
      this.matbankAutocomplete &&
      this.autocompleteTrigger &&
      this.matbankAutocomplete.panel
      ) {
      fromEvent(this.matbankAutocomplete.panel.nativeElement, 'scroll')
      .pipe(
      map(x => this.matbankAutocomplete.panel.nativeElement.scrollTop),
      takeUntil(this.autocompleteTrigger.panelClosingActions)
      )
      .subscribe(x => {
      const scrollTop = this.matbankAutocomplete.panel.nativeElement.scrollTop;
      const scrollHeight = this.matbankAutocomplete.panel.nativeElement.scrollHeight;
      const elementHeight = this.matbankAutocomplete.panel.nativeElement.clientHeight;
      const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
      if (atBottom) {
      if (this.has_next === true) {
      this.branchdetailsService.get_bankScroll(this.bankInput.nativeElement.value, this.currentpage + 1)
      .subscribe((results: any[]) => {
      let datas = results["data"];
      let datapagination = results["pagination"];
      this.bankList = this.bankList.concat(datas);
      if (this.bankList.length >= 0) {
      this.has_next = datapagination.has_next;
      this.has_previous = datapagination.has_previous;
      this.currentpage = datapagination.index;
      }
      })
      }
      }
      });
      }
      });
      }
  
      branchScroll() {
        setTimeout(() => {
        if (
        this.matbranchAutocomplete &&
        this.autocompleteTrigger &&
        this.matbranchAutocomplete.panel
        ) {
        fromEvent(this.matbranchAutocomplete.panel.nativeElement, 'scroll')
        .pipe(
        map(x => this.matbranchAutocomplete.panel.nativeElement.scrollTop),
        takeUntil(this.autocompleteTrigger.panelClosingActions)
        )
        .subscribe(x => {
        const scrollTop = this.matbranchAutocomplete.panel.nativeElement.scrollTop;
        const scrollHeight = this.matbranchAutocomplete.panel.nativeElement.scrollHeight;
        const elementHeight = this.matbranchAutocomplete.panel.nativeElement.clientHeight;
        const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
        if (atBottom) {
        if (this.has_next === true) {
        this.branchdetailsService.branchdropdown(this.branchrefid,this.branchInput.nativeElement.value, this.currentpage + 1)
        .subscribe((results: any[]) => {
        let datas = results["data"];
        let datapagination = results["pagination"];
        this.getBankbranchList = this.getBankbranchList.concat(datas);
        if (this.getBankbranchList.length >= 0) {
        this.has_next = datapagination.has_next;
        this.has_previous = datapagination.has_previous;
        this.currentpage = datapagination.index;
        }
        })
        }
        }
        });
        }
        });
        }
      
      
      paymodeScroll() {
        setTimeout(() => {
        if (
        this.matpaymodeAutocomplete &&
        this.autocompleteTrigger &&
        this.matpaymodeAutocomplete.panel
        ) {
        fromEvent(this.matpaymodeAutocomplete.panel.nativeElement, 'scroll')
        .pipe(
        map(x => this.matpaymodeAutocomplete.panel.nativeElement.scrollTop),
        takeUntil(this.autocompleteTrigger.panelClosingActions)
        )
        .subscribe(x => {
        const scrollTop = this.matpaymodeAutocomplete.panel.nativeElement.scrollTop;
        const scrollHeight = this.matpaymodeAutocomplete.panel.nativeElement.scrollHeight;
        const elementHeight = this.matpaymodeAutocomplete.panel.nativeElement.clientHeight;
        const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
        if (atBottom) {
        if (this.has_next === true) {
        this.branchdetailsService.get_paymodeScroll(this.paymodeInput.nativeElement.value, this.currentpage + 1)
        .subscribe((results: any[]) => {
        let datas = results["data"];
        let datapagination = results["pagination"];
        this.getPaymodeList = this.getPaymodeList.concat(datas);
        if (this.getPaymodeList.length >= 0) {
        this.has_next = datapagination.has_next;
        this.has_previous = datapagination.has_previous;
        this.currentpage = datapagination.index;
        }
        })
        }
        }
        });
        }
        });
        }
        
    
    branchPaymentCreate() {

      // this.SpinnerService.show();
    if (this.branchPayment.value.supplier ===""){
      this.toastr.error('Please Enter Supplier Name');
      // this.SpinnerService.hide();
      return false;
    }
    if (this.branchPayment.value.paymode_id ===""||this.branchPayment.value.paymode_id.id==undefined ){
      this.toastr.error('Please Select Valid Paymode');
      // this.SpinnerService.hide();
      return false;
    }
    if(!this.paymode_ddflag){
    if (this.branchPayment.value.account_type ===""|| this.branchPayment.value.account_type==undefined ){
      this.toastr.error('Please Select Any One Account Type');
      // this.SpinnerService.hide();
      return false;
    }
    if (this.branchPayment.value.bank_id ==="" ||this.branchPayment.value.bank_id.id==undefined){
      this.toastr.error('Please Select Valid Bank');
      // this.SpinnerService.hide();
      return false;
    }
    if (this.branchPayment.value.branch_id === null ||this.branchPayment.value.branch_id ==="" ||this.branchPayment.value.branch_id.id==undefined){
      this.toastr.error('Please Select Valid IFSC');
      // this.SpinnerService.hide();
      return false;
    }
  
    if (this.branchPayment.value.account_no ===""){
      this.toastr.error('Please Enter Account No');
      // this.SpinnerService.hide();
      return false;
    }
    if(this.branchPayment.value.bankname=="KARUR VYSYA BANK"){
      if(this.branchPayment.value.account_no.length!=16){
        this.toastr.error('Account No Must be 16 digits  ');
      // this.SpinnerService.hide();
      return false;
      }
    }
  }
  else{
    this.branchPayment.value.account_no='';
    this.branchPayment.value.bank_id='';
    this.branchPayment.value.branch_id ='';
    this.branchPayment.value.account_type ='';


  }
    // if (this.branchPayment.value.beneficiary ===""){
    //   this.toastr.error('Please Enter Benificiary Name');
    //   this.SpinnerService.hide();
    //   return false;
    // }

    if (this.branchPayment.value.beneficiary ===""){
      this.branchPayment.value.beneficiary= null
    }
   

    
    this.branchPayment.value.paymode_id=this.branchPayment.value.paymode_id.id;
    this.branchPayment.value.branch_id=this.branchPayment.value.branch_id.id;
    this.branchPayment.value.bank_id=this.branchPayment.value.bank_id.id;

    var str = this.branchPayment.value.account_no
    var cleanStr_accnum=str.trim();//trim() returns string with outer spaces removed
    this.branchPayment.value.account_no = cleanStr_accnum

    if(this.branchPayment.value.beneficiary !=null){
    var str = this.branchPayment.value.beneficiary
    var cleanStr_bene=str.trim();//trim() returns string with outer spaces removed
    this.branchPayment.value.beneficiary = cleanStr_bene
      }


    var str = this.branchPayment.value.remarks
    var cleanStr_rm=str.trim();//trim() returns string with outer spaces removed
    this.branchPayment.value.remarks = cleanStr_rm


 
  
  
      this.branchdetailsService.branchPayMentCreate(this.branchPayment.value)
        .subscribe(res => {
          console.log("payment",res)
          if(res.id === undefined){
            this.notification.showError(res.description)
            // this.SpinnerService.hide();
            return false;
          }
          else{
            this.notification.showSuccess("Saved Successfully!...")
            // this.SpinnerService.hide();
            this.onSubmit.emit();
            this.ngOnInit();
          }
         
        
      
        
        }
        // ,
        // error => {
        //   this.errorHandler.handleError(error);
        //   // this.SpinnerService.hide();
        // }
        )
     
    }
  
    omit_special_char(event) {
      var k;
      k = event.charCode;
      return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }
  
    getPaymode(q) {
      console.log(q)
      this.branchdetailsService.paymodedropdown(q)
        .subscribe((results: any[]) => {
          let datas = results["data"];
          this.getPaymodeList = datas;
        
          let datapagination = results["pagination"];
          this.getPaymodeList = datas;
         
        })
    }
    // ---paymode
    public displayPaymode(paymodeget?: paymode): string | undefined {
  
      return paymodeget ? paymodeget.name : undefined;
    }
  
    get paymodeget() {
      return this.branchPayment.get('paymode_id');
    }
  // ------
  
  // ---bank
  public displayBank(bankget?: bank): string | undefined {
   
    return bankget ? bankget.name : undefined;
  }
  
  get bankget() {
    return this.branchPayment.get('bank_id');
  }
  // ------
  
  // ---bankbranch
  public displayBranch(bankbranchget?: branch): string | undefined {
  
    return bankbranchget ? bankbranchget.ifsccode : undefined;
  }
  
  get bankbranchget() {
    return this.branchPayment.get('branch_id');
  }
  // ------
  
  
  getBankbranch(id,query) {
      this.branchdetailsService.branchdropdown(id,query,1)
        .subscribe((results: any[]) => {
          let datas = results["data"];
          this.getBankbranchList = datas;
          let datapagination = results["pagination"];
          this.getBankbranchList = datas;
          
        })
    }
  
    getbranch(data){
      this.branchPayment.get('branch_id').setValue(null);
      this.branchPayment.get('bname').setValue(null);
      this.displayBranch(null)
      this.branchrefid=data.id;
      this.getBankbranch(data.id,'')
    }
  
    getbranchname(data){
      // this.branchPayment.get('bname').setValue(data.name);
      
        let ifsccode = data.ifsccode
        if(data.id!=undefined){
          // this.SpinnerService.show();
          this.branchPayment.get('bank_id').setValue(data.bank)
            this.branchPayment.get('bankname').setValue(data.bank.name)
            this.branchPayment.get('bname').setValue(data.name)
            if(this.branchPayment.value.bankname=="KARUR VYSYA BANK"){
              this.maxlength=16
            }else{
              this.maxlength=18
            }
            
        // this.branchdetailsService.ifscodevalidation(ifsccode).then(res => {
        //     let result = res.validation_status
        //     this.ifsccode = result
        //     if (result.bpms_error_msg !="Success") {
        //       this.notification.showWarning("Please Choose a Valid IFSC Code")
        //       this.ifsccodename='';
        //       // this.user$=
  
        //       this.branchPayment.get('bank_id').setValue('')
        //       this.branchPayment.get('bankname').setValue('')
        //       this.branchPayment.get('bname').setValue('')
             
        //       this.SpinnerService.hide();
        //       return false;
              
        //     } if (result.bpms_error_msg === "Success") {
        //       this.notification.showSuccess("IFSC  validated...")
        //       if(result.out_msg.Bank_Name==data.bank.name){
        //         this.branchPayment.get('bank_id').setValue(data.bank)
        //         this.branchPayment.get('bankname').setValue(data.bank.name)
            
        
        //      } 
        //      if(result.out_msg.Branch_Name==data.name){
        //       this.branchPayment.get('bname').setValue(data.name)
          
      
        //    } 
            //  this.SpinnerService.hide();
            }
            else{
              this.notification.showWarning("Please Choose a Valid IFSC Code")
              this.ifsccodename='';
              this.branchPayment.get('bank_id').setValue('')
              this.branchPayment.get('bankname').setValue('')
              this.branchPayment.get('bname').setValue('')
             
              // this.SpinnerService.hide();
             
            }
    
          // },
          // error => {
          //   this.notification.showWarning("IFSC validation failure")
          //   this.branchPayment.get('bank_id').setValue('')
          //   this.branchPayment.get('bankname').setValue('')
          //   this.branchPayment.get('bname').setValue('')
           
          //   this.SpinnerService.hide();
          //   return false;
          // }
          // )}
            // if(this.branchPayment.value.bank)
      
          
  
      
    }
    branchdetails() {
      // let data :any= this.shareService.branchView.value;
    let data = this.branchDetailShareService.branchName.value;
    console.log("branchanme",data)
    //  this.mainbid=data.id;
    this.branchPayment.patchValue({
      // panno:data.panno,
      supplier:data,
      // branchid:data.id,
      // pan:data.panno,
      beneficiary:data
    })
  }
  onCancelClick() {
    this.onCancel.emit()
  }
  clear(){
    // this.branch_id.nativeElement.value = ' ';
  
  
  
  }
  namevalidation(event){
      
    var inp = String.fromCharCode(event.keyCode);
  
    if (/[a-zA-Z0-9-/  ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  
  addressvalidation(event){
    
    var inp = String.fromCharCode(event.keyCode);
  
    if (/[a-zA-Z0-9-_#@.', /&]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  }
