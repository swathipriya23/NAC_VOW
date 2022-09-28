import {  Component, OnInit,Output,ElementRef, EventEmitter,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms'
import { MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import { VendorDocumentService} from '../vendor-document.service'
import { VendorDocShareService } from '../vendor-doc-share.service';
import { debounceTime, distinctUntilChanged, tap, filter, switchMap, finalize, takeUntil, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { VowSharedService} from 'src/app/service/vow-shared.service';
import { NotificationService} from 'src/app/service/notification.service';
import { ErrorHandlingService} from 'src/app/service/error-handling.service';
import { ToastrService } from 'ngx-toastr';


export interface documentListss {
  name: string;
  id: number;
}

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements OnInit {

  @Output() onCancel = new EventEmitter<any>();
  @Output() onSubmit = new EventEmitter<any>();
  DocumentEditForm:FormGroup
  Documentlist:Array<documentListss>
  isLoading=false;
  has_next = true;
  has_previous = true;
  documentEditId=0;
  currentpage: number = 1;
  file:string;
  filesid:number;
  vendorId:number;
  FileId:number;
  Filename:string;
  filesnames:string;
  FileName:string;
  fileList=[];
  documentEditButton = false;
  
  totalData:any;
  @ViewChild('takeInput', { static: false })
  InputVar: ElementRef;
  uploadList = [];
  images:string  []  =  [];
  branch_code:any;
  
  @ViewChild('parenttype') matdocAutocomplete: MatAutocomplete;
  @ViewChild('docInput') docInput: any;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;
 
  constructor(private router: Router,private toastr: ToastrService,private notification: NotificationService,private errorHandler: ErrorHandlingService,
    private vowShareService: VowSharedService,private fb: FormBuilder,
    private vendordocService: VendorDocumentService,private vendordocshareservice: VendorDocShareService) { }

  ngOnInit(): void {
    let data:any = this.vowShareService.vendorDocScreen_loginResult.value
    this.branch_code = data.branch_code
    
    this.DocumentEditForm = this.fb.group({
     
      partner_id: [{'value':this.vendorId,disabled: true }],
      docgroup_id: [''], 
      period: new FormControl('',[Validators.required,Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]),
      remarks: [''],
      file_name:['',[Validators.required]],
      })
    
     this.getDocumentEditForm()

    // let parentkeyvalue: String="";
    // this.getParent(parentkeyvalue);
    // this.DocumentEditForm.get('docgroup_id').valueChanges
    // .pipe(
    //   debounceTime(100),
    //   distinctUntilChanged(),
    //   tap(() => {
    //     this.isLoading = true;
    //       console.log('inside tap')
          
    //   }),

    //   switchMap(value => this.vendordocService.get_parentScroll(value,1)
    //     .pipe(
    //       finalize(() => {
    //         this.isLoading = false
    //       }),
    //     )
    //   )
    // )
    // .subscribe((results: any[]) => {
    //   let datas = results["data"];
    //   this.Documentlist = datas;
    //   console.log("Documentlist", datas)
    // })
}
docgroupname(){
  let parentkeyvalue: String="";
    this.getParent(parentkeyvalue);
    this.DocumentEditForm.get('docgroup_id').valueChanges
    .pipe(
      debounceTime(100),
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
          console.log('inside tap')
          
      }),

      switchMap(value => this.vendordocService.getParentDropDown(value,1)
        .pipe(
          finalize(() => {
            this.isLoading = false
          }),
        )
      )
    )
    .subscribe((results: any[]) => {
      let datas = results["data"];
      this.Documentlist = datas;
      console.log("Documentlist", datas)
    })
}

// data(datas){
//   let values=datas.id
//   this.vendordocService .downloadfile(values)
//  }

// fileDeletes(data,index:number){
//   let value = data.id
//   console.log("filedel", value)
//   this.vendordocService .deletefile(value)
//   .subscribe(result =>  {
//    this.notification.showSuccess("Deleted....")
//    this.fileList.splice(index, 1);
  
//   })

// }



  getDocumentEditForm() {
    let data :any= this.vendordocshareservice.docEdit.value
    console.log("da",data)
    // for(var i=1;i<data.file_id.length;i++){
    //   this.FileId=data.file_id[i].id;
    //  }
    
    this.vendordocService.getdocumentEdit(data.id,this.branch_code)
        .subscribe((result:any) => {
    this.documentEditId = result.id;
    let Partner_Id=result.partner_id;
    let doc=result.docgroup_id;
    let Period=result.period;
    let Remarks=result.remarks;
    this.fileList=result.file_data.data
    
    
    this.DocumentEditForm.patchValue({
      partner_id:Partner_Id,
      docgroup_id:doc,
      period: Period,
      remarks:Remarks,
      file_name:this.fileList
      })
  })
  }
  createFormat() {
    let data = this.DocumentEditForm.controls;
    let objdocument = new documents();
    // let documentEditId=data.id;
    objdocument.id=this.documentEditId;
    objdocument.partner_id = data['partner_id'].value;
    objdocument.docgroup_id = data.docgroup_id.value.id;
    objdocument.period = data['period'].value;
    // objdocument.remarks = data['remarks'].value;
    objdocument.file_name=data['file_name'].value;

    var str = data['remarks'].value
    var cleanStr_rmk=str.trim();//trim() returns string with outer spaces removed
    objdocument.remarks = cleanStr_rmk
    
    return objdocument;
  }

  docSubmitForm() {
    // this.SpinnerService.show();
    if (this.DocumentEditForm.value.docgroup_id.id==undefined||this.DocumentEditForm.value.docgroup_id.id<=0){
      this.toastr.error('Please Select DocumentGroup Name');
      // this.SpinnerService.hide();
      return false;
    }
  
    
    if (this.DocumentEditForm.value.period ===""){
      this.toastr.error('Please Enter Period');
      // this.SpinnerService.hide();
      return false;
    }
   
   
    this.vendordocService.documentEditCreateForm(this.branch_code,this.createFormat(),this.images)
    .subscribe(result => {
      console.log("result", result);
       if(result.status === 'success'){
        this.notification.showSuccess("Updated Successfully!...")
        this.router.navigate(['vendordocument/vendordocsummary']);
        // this.notification.showError(result.description)
        // this.SpinnerService.hide();
      }
      else{
        this.notification.showError(result.description)
        return false;
        // this.notification.showSuccess("Saved Successfully!...")
        // this.SpinnerService.hide();
        // this.onSubmit.emit();
      }
    }
    
    // error => {
    //   this.errorHandler.handleError(error);
    //   this.SpinnerService.hide();
    // }
    )
  }
  
  public displayFnparent(parenttype?: documentListss): string | undefined {
    //  console.log('id',parenttype.id);
    //  console.log('name',parenttype.name);
    return parenttype ? parenttype.name : undefined;
  }
  
  get parenttype() {
    return this.DocumentEditForm.get('docgroup_id');
  }
  
  private getParent(parentkeyvalue) {
    this.vendordocService.getParentDropDown(parentkeyvalue,1)
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.Documentlist = datas;
        console.log("prnt", datas)
        
      })

      
  }
  
  // parentScroll() {
  //   setTimeout(() => {
  //   if (
  //   this.matdocAutocomplete &&
  //   this.matdocAutocomplete &&
  //   this.matdocAutocomplete.panel
  //   ) {
  //   fromEvent(this.matdocAutocomplete.panel.nativeElement, 'scroll')
  //   .pipe(
  //   map(x => this.matdocAutocomplete.panel.nativeElement.scrollTop),
  //   takeUntil(this.autocompleteTrigger.panelClosingActions)
  //   )
  //   .subscribe(x => {
  //   const scrollTop = this.matdocAutocomplete.panel.nativeElement.scrollTop;
  //   const scrollHeight = this.matdocAutocomplete.panel.nativeElement.scrollHeight;
  //   const elementHeight = this.matdocAutocomplete.panel.nativeElement.clientHeight;
  //   const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
  //   if (atBottom) {
  //   if (this.has_next === true) {
  //   this.vendordocService.get_parentScroll(this.docInput.nativeElement.value, this.currentpage + 1)
  //   .subscribe((results: any[]) => {
  //   let datas = results["data"];
  //   let datapagination = results["pagination"];
  //   this.Documentlist = this.Documentlist.concat(datas);
  //   if (this.Documentlist.length >= 0) {
  //   this.has_next = datapagination.has_next;
  //   this.has_previous = datapagination.has_previous;
  //   this.currentpage = datapagination.index;
  //   }
  //   })
  //   }
  //   }
  //   });
  //   }
  //   });
  //   }

    
  onCancelDoc(){
    this.router.navigate(['vendordocument/vendordocsummary']);
  }


    fileChange(event) {
      // let imagesList = [];
      this.images = [];
      for (var i = 0; i < event.target.files.length; i++) {
        this.images.push(event.target.files[i]);
      }
      }

      fileDelete(data,index:number){
        let value = data.id
        console.log("id", value)
        this.notification.showSuccess("Deleted....")
        this.fileList.splice(index, 1);
      }



  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 45 || charCode >46)  && (charCode < 48 || charCode > 57) ){ 
    return false;
    }
    return true;
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

  
  class documents {
    id:any;
    partner_id: number;
    docgroup_id: any;
    period: any;
    remarks: any;
    file_id:any;
    file_name:String;
    
  }
