import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms'
import { VendorDocumentService} from '../vendor-document.service'
import { debounceTime, distinctUntilChanged, tap, filter, switchMap, finalize, takeUntil, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { VowSharedService} from 'src/app/service/vow-shared.service';
import { NotificationService} from 'src/app/service/notification.service';
import { ErrorHandlingService} from 'src/app/service/error-handling.service'

export interface docGroupList {
  name: string;
  id: number;
}
@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {

 
  DocumentAddForm:FormGroup;
  docGroupList:any;
  isLoading= false;
  images:string  []  =  [];
  branch_code:any;

  constructor(private fb: FormBuilder,private vendordocService: VendorDocumentService,private router: Router,
    private vowShareService: VowSharedService, private notification: NotificationService, private errorhandler: ErrorHandlingService) { }

  ngOnInit(): void {
    let data:any = this.vowShareService.vendorDocScreen_loginResult.value
    this.branch_code = data.branch_code
    this.DocumentAddForm = this.fb.group({
      partner_id: [''],
       docgroup_id: [''], 
       period: new FormControl('',[Validators.required,Validators.pattern(".*\\S.*[a-zA-z0-9 ]")]),
       remarks: [''],
       })
  }


  // password = ''

  fileChange(event) {
    // let imagesList = [];
    this.images = [];
    for (var i = 0; i < event.target.files.length; i++) {
      this.images.push(event.target.files[i]);
    }
    }


  docgroupname(){
    let parentkeyvalue: String="";
    this.getParent(parentkeyvalue);
    this.DocumentAddForm.get('docgroup_id').valueChanges
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
      this.docGroupList = datas;
    })
   }
  createFormat() {
      let data = this.DocumentAddForm.controls;
      let objdocument = new document();
      objdocument.partner_id = data['partner_id'].value;
      objdocument.docgroup_id = data['docgroup_id'].value.id;
      objdocument.period = data['period'].value;
      

      var str = data['remarks'].value
      var cleanStr_rmk=str.trim();//trim() returns string with outer spaces removed
      objdocument.remarks = cleanStr_rmk
  
      return objdocument; 
      }
      docSubmitForm() {
      // this.SpinnerService.show();
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
      
      
      this.vendordocService.createDocumentForm(this.branch_code,this.createFormat(),this.images)
      .subscribe(result => {
        console.log("result", result);
         if(result.message === 'Successfully Created'){
          this.notification.showSuccess("Saved Successfully!...")
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
      //   this.errorhandler.handleError(error);
      //   // this.SpinnerService.hide();
      // }
      )
    }
   
    public displayFnparent(parenttype?: docGroupList): string | undefined {
      return parenttype ? parenttype.name : undefined;
    }
    
    get parenttype() {
      return this.DocumentAddForm.get('docgroup_id');
    }
    
    private getParent(parentkeyvalue) {
      this.vendordocService.getParentDropDown(parentkeyvalue,1)
        .subscribe((results: any[]) => {
          let datas = results["data"];
          this.docGroupList = datas;
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
    //   this.atmaService.get_parentScroll(this.docInput.nativeElement.value, this.currentpage + 1)
    //   .subscribe((results: any[]) => {
    //   let datas = results["data"];
    //   let datapagination = results["pagination"];
    //   if (this.Documentlist.length >= 0) {
    //   this.Documentlist = this.Documentlist.concat(datas);
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
      // fileChange(event) {
      //   let imagesList = [];
      //   for (var i = 0; i < event.target.files.length; i++) {
      //     this.images.push(event.target.files[i]);
      //   }
      //   this.InputVar.nativeElement.value = '';
      // imagesList.push(this.images);
      // this.uploadList = [];
      // imagesList.forEach((item) => {
      //   let s = item;
      //   s.forEach((it) => {
      //     let io = it.name;
      //     this.uploadList.push(io);
      //   });
      // });
      //   }
       
      // deleteUpload(s, index) {
      //   this.uploadList.forEach((s, i) => {
      //     if (index === i) {
      //       this.uploadList.splice(index, 1)
      //       this.images.splice(index, 1);
      //     }
      //   })
      // }
    // onCancelClick() {
    // this.onCancel.emit()
    //   }
      numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode < 45 || charCode >46)  && (charCode < 48 || charCode > 57) ){ 
        return false;
        }
        return true;
      }

      onCancelDoc(){
        this.router.navigate(['vendordocument/vendordocsummary']);
      }

}
class document {
  partner_id: number;
  docgroup_id: any;
  period: any;
  remarks: any;
  
}