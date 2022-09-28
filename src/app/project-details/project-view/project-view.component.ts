import { Component, OnInit,ViewChild,HostListener } from '@angular/core';
import { ProjectDetailsshareService } from '../project-detailsshare.service';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms'
import { ProjectDetailsService } from '../project-details.service';
import { Router } from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser';
import { VowService } from 'src/app/service/vow.service';
import { NotificationService} from 'src/app/service/notification.service';
import { ToastrService } from 'ngx-toastr';
import {Observable, Observer} from 'rxjs';
import { VowSharedService } from 'src/app/service/vow-shared.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { ErrorHandlingService } from  'src/app/service/error-handling.service'
// import { isBoolean } from 'util';


export interface ExampleTab {
  tab_name: string;
  tab_id: string;
}


@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

 
  project_Id:number;
  ApplyForm:FormGroup;
  commentForm:FormGroup;
  replyForm:FormGroup;
  superScriptForm: FormGroup;
  superScriptCommentForm:FormGroup;
  agrversionform:FormGroup;
  defalutbranchList:any;
  entity_Id:any;
  viewDataList = [];
  images:string  []  =  [];
  comment_images=[];
  reply_images=[];
  popupform:FormGroup;

  code: string;
  title: string;
  titlename: string;
  onbehalf:string;
  cat:string;
  subcat:string;
  desc:string;
  note:string;
  type:string;
  budget: string;
  projectStdate: string
  projectEndate: string;
  submissionStdate: any;
  submissionEndate: string;
  removeFile = [];
  // projectCommentsList= [];
  viewproposalList:any;
  proposalView_Id:any;
  resubmitList:any;
  fileList=[];
  proposal_Id:number;
  comment_Id:number;
  user_Id:number;
  portal_type_for_vendor:any;
  branch_code:any;
  is_Applied:any;
  view:any;
  versionList:any;
  historyList:any;
  proposalStatus:any;
  isShowSubmit:boolean = false;
  proposal_review:boolean;
  PremiseEditbtn = false;

  issubmitproposalbutton:boolean = false;
  isclicked_applySubmitproposal:boolean = false
  isViewMenu:boolean = false;
  isProposal:boolean = true;
  isResubmitButton:boolean = true;
  isComments:boolean = false;
  isQusetn:boolean = false;
  isHistory:boolean = false;
  islegalAgmt:boolean =  false;

  @ViewChild('commentfileInput') commentfileInput: any;
  @ViewChild('replyfileInput') replyfileInput: any;
  projectQustnList=[{'id':1,'name':'All'},{'id':2, 'name':'Applied'}];
  arraydata=[]
  asyncTabs=[
    { "tab_name": "Proposal", "tab_id": "1" },
    { "tab_name": "Questionnaire", "tab_id": "2"},
    { "tab_name": "Conversation", "tab_id": "3" },
    { "tab_name": "Legal Agreement", "tab_id": "4" },
    ]

  constructor(private fb: FormBuilder,public projectdetailsService: ProjectDetailsService,private router: Router,
    private projectdetailsshareservice: ProjectDetailsshareService,public vowService: VowService,private notification: NotificationService
    ,private toastr:ToastrService,private vowshareservice: VowSharedService,private sanitizer: DomSanitizer,public datepipe: DatePipe
    ,private errorHandler :ErrorHandlingService) { 
      // this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      //   setTimeout(() => {
      //     observer.next([
      //     { "tab_name": "Proposal", "tab_id": "1" },
      //     { "tab_name": "Conversation", "tab_id": "2" },
      //     ]);
      //   }, 1000);
      // });
    }


    config: any = {
      airMode: false,
      tabDisable: true,
      popover: {
        table: [
          ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
          ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
        ],
        link: [['link', ['linkDialogShow', 'unlink']]],
        air: [
          [
            'font',
            [
              'bold',
              'italic',
              'underline',
              'strikethrough',
              'superscript',
              'subscript',
              'clear',
            ],
          ],
        ],
      },
      height: '200px',
      // uploadImagePath: '/api/upload',
      toolbar: [
        ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
        [
          'font',
          [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'superscript',
            'subscript',
            'clear',
          ],
        ],
        ['fontsize', ['fontname', 'fontsize', 'color']],
        ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['table', 'picture', 'link', 'hr']],
      ],
      codeviewFilter: true,
      codeviewFilterRegex: /<\/*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|ilayer|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|t(?:itle|extarea)|xml|.*onmouseover)[^>]*?>/gi,
      codeviewIframeFilter: true,
    };

  ngOnInit(): void {
    // this.getfun();
    this.ApplyForm  = this.fb.group({
      name: [''],
      budget: [''],
      proposer_code: [''],
      content: [''],
      file_remove: [[]],
      is_vendor:[''],
      execution_note:[''],
      financial_note:['']
    
  });

  
  this.commentForm = this.fb.group({
    comment: [''],
  })

  this.replyForm = this.fb.group({
    comment: [''],
  })

  this.popupform = this.fb.group({
    type: [''],
    
  })

  this.superScriptForm = this.fb.group({
    remarks: ['']
  })
  this.superScriptCommentForm=this.fb.group({
    comments: ['']
  })

  this.agrversionform=this.fb.group({
    agrversion: ['']
  })

 
  // get project Id
   let view =  this.projectdetailsshareservice.projectSummaryView.value;
   this.project_Id = view.id;
   console.log("project-summaryview",view)
   
  // entity Id  
   let entity =  this.projectdetailsshareservice.entity_SumTo_View.value;
   console.log("entity_id",entity)
   this.entity_Id = entity;

  //  login response
   let data:any = this.vowshareservice.projectcreen_loginResult.value;
   this.branch_code = data.branch_code
   this.user_Id = data.user_id
   this.portal_type_for_vendor = data.portal_type
   console.log("project view-loginresult",this.user_Id)
    this.GetProject_view();
  }

  // get project view
  GetProject_view() {
    this.projectdetailsService.GetProject_viewDetails(this.project_Id,this.entity_Id,this.user_Id,this.branch_code)
      .subscribe(results => {
          console.log("view-projectdetails", results)
          this.view =results
          this.code= results.code
          if(results.commodity_id != null){
            this.cat = results.commodity_id.name
          }
          if(results.subcommodity != null){
            this.subcat=  results.subcommodity
          }
          this.desc = results.description
          this.note = results.covernote.note
          // this.onbehalf  = results.onbehalf_group.name
          this.titlename= results.title
          this.type=results.type.name
          this.budget =results.budget
          this.projectStdate=results.project_start_date
          this.projectEndate=results.project_end_date
          this.submissionStdate=results.submission_start_date
          this.submissionEndate=results.submission_end_date 
          this.is_Applied =results.is_applied;
          if(this.is_Applied == false){
            this.issubmitproposalbutton = true;
            this.isViewMenu = false;
          } else {
            this.issubmitproposalbutton = false;
            this.isViewMenu = true;
          }  
          this.defaultBranch_List();  
      })
      
   
  }

    // defalut branch details
    defaultBranch_List() {
      this.projectdetailsService.defaultBranch_List()
        .subscribe((results: any[]) => {
          this.defalutbranchList = results;
          this.ApplyForm.patchValue({
            name:this.defalutbranchList.name,
            proposer_code:this.defalutbranchList.branch_code,
          })
          this.GetProposal_view();
        })
    }


  isactionButton = false;
  // view proposal
  GetProposal_view() {
    this.projectdetailsService.GetProposal_viewDetails(this.defalutbranchList.branch_code,this.project_Id,this.entity_Id,this.user_Id)
      .subscribe(results => {
          console.log("view-proposaldetails", results)    
          this.viewproposalList = results;  
          let data = results 
          if( 'id' in results   ){
            this.proposalView_Id = this.viewproposalList.id;
            this.proposalStatus = this.viewproposalList.approval_status.text;
            if((this.proposalStatus == "DRAFT"  || this.proposalStatus == "REVIEW")){
               this.isactionButton = true;
            }
            if((this.proposalStatus == "DRAFT" && this.is_Applied == true)){
              this.isShowSubmit = true;
              this.proposal_review = false;
            } else if ((this.proposalStatus == "PENDING" && this.is_Applied == true)){
              this.isShowSubmit= false;
              this.proposal_review = true;
            } 

            this.GetVersion();
          }
         else{
          console.log("Hiii swathiiiii")
         }
          
      })
   
    
  }

  // version dropdown for proposal
  GetVersion() {
    this.projectdetailsService.GetVersion(this.proposalView_Id,this.entity_Id,this.user_Id)
      .subscribe(results => {
        let datas = results["data"];
        this.versionList = datas;
          // this.versionList = results;
          console.log("version", this.versionList)       
      })
  }

  versionArray=[];
  agreement_versionList = [];
  obj = ""
  obj1 = ""
  last_version:any;
  last_version_data:any;
  getagree_version(version_count){
    this.versionArray=[]; 
    this.agreement_versionList = [];
    this.versionArray = Array.from(Array(version_count).keys())
    console.log("kk",this.versionArray)
    
    
    let count= 1
    let count1 =1
    for(let i=0;i<this.versionArray.length;i++)
    {
      let json ={
          "version": 'version' + count++,
          "id":count1++
      }
      this.agreement_versionList.push(json)
    }
    console.log("agr_version", this.agreement_versionList)

  
    for(let i=0;i<this.agreement_versionList.length;i++){
      this.last_version_data = this.agreement_versionList[i]
      this.last_version = this.agreement_versionList[i].id
    }
    console.log("cvv", this.last_version)

    this.agrversionform.patchValue({
      "agrversion":this.last_version
    })
    this.selectagr_Version(this.last_version_data)
    

  }

  selectagr_Version(agr_version){
    let agr_version_Id = agr_version.id;
    this.projectdetailsService.selectagr_Version(this.LA_Id,agr_version_Id,this.entity_Id,this.user_Id)
      .subscribe(result  => {
        // // let datas = results["data"];
        // // this.projectCommentsList = datas;
        console.log("selected agr_version", result) 
        let script = result.data;
        this.version_count = result.version
        if(result.superscript != null){
          this.contentName = result.superscript;
        }
        this.superscriptlist = script
        this.supindex = this.superscriptlist.length + 1
         script.forEach((element, index) => {
          let indexValue = index;
          this.scriptContent = element.content;
          for(var i=0;i<element.comments.length;i++){
          this.scriptRemarks = element.comments[i].content;
          
         
          }
         
          let supSript: string = "[" + indexValue + "]"
          let final: string =
            "<b  >" + this.scriptContent + "<sup  title = " + "'" + this.scriptRemarks + "'" + ">" + supSript + "</sup>" + "</b>"
          this.contentName = this.contentName.replace(this.scriptContent, final)
         
        });
        // this.getagree_version(this.version_count); 
        // this.viewproposalList = results;     
        })
  }


    // select version
    selectVersion(version){
      let version_Id = version.id;
      this.projectdetailsService.GetSelectVersion(this.proposalView_Id,version_Id,this.entity_Id,this.user_Id)
      .subscribe((results: any[]) => {
        // let datas = results["data"];
        // this.projectCommentsList = datas;
        console.log("selected version", results)  
        this.viewproposalList = results;     
        })
  
    }


  // comments
onFileSelect_comment(event){
  this.comment_images = [];
    for (var i = 0; i < event.target.files.length; i++) {
      this.comment_images.push(event.target.files[i]);
    }
}

  // reply
  onFileSelect_reply(event){
    this.reply_images = [];
    for (var i = 0; i < event.target.files.length; i++) {
      this.reply_images.push(event.target.files[i]);
    }
  }

  // post comment
  onclickComment(){
    if(this.commentForm.value.comment == ""){
      this.toastr.error('Please Enter Comments');
      return false;
    }
    this.projectdetailsService.onclickCommentForm(this.commentForm.value,this.comment_images,this.project_Id,this.entity_Id,this.user_Id)
    .subscribe((res) => {
      if(res.id){
        this.notification.showSuccess("Submitted..")
        this.GetComment(); 
        this.commentForm = this.fb.group({
          comment: [''],
        })
        this.commentfileInput.nativeElement.value = ""
      }
      else {
        this.notification.showError(res.description)
        return false;
      }
    })

  }

    // post reply
    onclickReply(commentid){
      this.projectdetailsService.onclickReplyForm(this.replyForm.value,this.reply_images,commentid,this.project_Id,this.entity_Id,this.user_Id)
      .subscribe((res) => {
        if(res.id){
          // this.notification.showSuccess("Created Successfully..")
          this.GetComment(); 
          this.replyForm = this.fb.group({
            comment: [''],
          })
          this.replyfileInput.nativeElement.value = ""
        }
        else {
          this.notification.showError(res.description)
          return false;
        }
      })
  
    }

  projectCommentsList:any;
// get comments
  GetComment() {
    this.projectdetailsService.getComments(this.project_Id,this.entity_Id,this.user_Id)
    .subscribe((results: any[]) => {
      let datas = results["data"];
      this.projectCommentsList = datas;
      console.log("projectCommentsList", this.projectCommentsList)       
      })
  }

  // history
  GetHistory() {
    this.projectdetailsService.getHistory(this.proposalView_Id,this.entity_Id,this.user_Id)
    .subscribe((results: any[]) => {
      let datas = results["data"];
      this.historyList = datas;
      console.log("historyList", this.historyList)       
      })
  }
 

  array=[];
  fileDelete(data,index:number){
    let value = data.id
    console.log("id", value)
    this.notification.showSuccess("Deleted....")
    this.fileList.splice(index, 1);
    this.array.push(data.id)
    this.ApplyForm.patchValue({
      file_remove:this.array
    })
  }


  fileChange(event){
    this.images = [];
      for (var i = 0; i < event.target.files.length; i++) {
        this.images.push(event.target.files[i]);
      }
  }

  // createFormat() {
  //   let data = this.ApplyForm.controls;
  //   let objdocument = new projectApply();
  //   objdocument.name = data['name'].value;
  //   objdocument.budget = data['budget'].value;
  //   objdocument.proposer_code = data['proposer_code'].value;
  //   objdocument.content = data['content'].value;
  //   // objdocument.isnote_changed = data['isnote_changed'].value;
  //   objdocument.file_remove = data['file_remove'].value ;
  //   objdocument.is_vendor = data['is_vendor'].value ;
  //   return objdocument; 
  //   } 



   
    submitProposal(){
      this.issubmitproposalbutton = false;
      this.isclicked_applySubmitproposal = true;
      this.isProposal = false;
      this.isResubmitButton = false;
      this.isComments = false;
      this.isQusetn = false;
      this.isHistory =  false;
    }

    Proposal(){
    this.isProposal = true;
    this.isResubmitButton = true;
    this.isComments = false;
    this.issubmitproposalbutton = false;
    this.isclicked_applySubmitproposal = false;
    this.isQusetn = false;
    this.isHistory =  false;
    this.GetProposal_view();
    }

  // resubmit
  reSubmitButton(){
    this.isProposal = false;
    this.isComments = false;
    this.isclicked_applySubmitproposal = true;
    this.issubmitproposalbutton = false;
    this.isResubmitButton = false;
    this.isQusetn = false;
    this.isHistory =  false;
    this.projectdetailsService.GetProposal_viewDetails(this.defalutbranchList.branch_code,this.project_Id,this.entity_Id,this.user_Id)
      .subscribe(results => {
          this.resubmitList = results;
          this.fileList=this.resubmitList.filedata
          this.proposal_Id=this.resubmitList.id
          console.log("view-proposaldetails", results)
          this.ApplyForm.patchValue({
            budget:this.resubmitList.budget,
            content:this.resubmitList.covernote.note,
            execution_note:this.resubmitList.execution_note.note,
            financial_note:this.resubmitList.execution_note.note,

          })  
      })
  }

    Conversation(){
      this.isComments = true;
      this.isProposal = false;
      this.isResubmitButton = false;
      this.issubmitproposalbutton = false;
      this.isclicked_applySubmitproposal = false;
      this.isQusetn = false;
      this.isHistory =  false;
      this.GetComment();
    }

    docFile(file){
      
    }

    get_tabe(event, selected){
      console.log("tab",event)
      console.log("selected tab", selected)
      if(selected.tab_name == "Proposal"){
        this.isProposal = true;
        this.isResubmitButton = true;
        this.isComments = false;
        this.issubmitproposalbutton = false;
        this.isclicked_applySubmitproposal = false;
        this.isQusetn = false;
        this.isHistory =  false;
        this.islegalAgmt = false;
        this.GetProposal_view();
        // this.GetVersion();
      } else if(selected.tab_name == "Conversation"){
        this.isComments = true;
        this.isProposal = false;
        this.isResubmitButton = false;
        this.issubmitproposalbutton = false;
        this.isclicked_applySubmitproposal = false;
        this.isQusetn = false;
        this.isHistory =  false;
        this.islegalAgmt = false;
        this.GetComment();

      }
      else if(selected.tab_name == "Questionnaire"){
        this.isComments = false;
        this.isProposal = false;
        this.isResubmitButton = false;
        this.issubmitproposalbutton = false;
        this.isclicked_applySubmitproposal = false;
        this.isQusetn = true;
        this.isHistory =  false;
        this.islegalAgmt = false;
        // this.vendor_login();
        this.getQustnTypeList();

      }
      else if(selected.tab_name == "Legal Agreement"){
        this.isComments = false;
        this.isProposal = false;
        this.issubmitproposalbutton = false;
        this.isclicked_applySubmitproposal = false;
        this.isQusetn = false;
        this.islegalAgmt =  true;
        this.getlegalAgreementList();
      }
      // else if(selected.tab_name == "History"){
      //   this.isComments = false;
      //   this.isProposal = false;
      //   this.isResubmitButton = false;
      //   this.issubmitproposalbutton = false;
      //   this.isclicked_applySubmitproposal = false;
      //   this.isQusetn = false;
      //   this.isHistory =  true;
      //   this.islegalAgmt = false;
      //   this.GetHistory();

      // }


    }


    // save proposal
    save_proposal() {
      // setTimeout(() => {
    if (this.ApplyForm.value.budget === "") {
      this.ApplyForm.value.budget = null;
      // this.toastr.error('Please Enter Budget');
      // // this.SpinnerService.hide();
      // return false;
    }
    if(this.portal_type_for_vendor == 1 ){
      this.ApplyForm.value.is_vendor = false;
    } else {
      this.ApplyForm.value.is_vendor = true;
    }
    if(this.proposal_Id){
      // if(this.resubmitList.content != this.ApplyForm.value.content){
      //   this.ApplyForm.value.isnote_changed = true;
      // } else {
      //   this.ApplyForm.value.isnote_changed = false;
      // }
    this.ApplyForm.value
    console.log("edit",this.ApplyForm.value)
    this.projectdetailsService.re_SubmitForm(this.project_Id,this.ApplyForm.value,this.images,this.entity_Id,this.proposal_Id,this.user_Id)
    .subscribe((res) => {
      // if(res.id === undefined){
      //   this.notification.showError(res.description)
      //   return false;
      // }
      // else {
      //   console.log("re_submit",res)
      //   this.isProposal = true;
      //   this.isComments = false;
      //   this.isResubmitButton = true;
      //   this.issubmitproposalbutton = false;
      //   this.isclicked_applySubmitproposal = false;
      //   this.images=[];
      //   this.array=[];
      //   this.isQusetn = false;
      //   this.isHistory =  false;
      //   this.GetProposal_view();
      
      // }
      if (res.status == "Success") {
        console.log("re_submit",res)
          this.isProposal = true;
          this.isComments = false;
          this.isResubmitButton = true;
          this.issubmitproposalbutton = false;
          this.isclicked_applySubmitproposal = false;
          this.images=[];
          this.array=[];
          this.isQusetn = false;
          this.isHistory =  false;
          this.projectdetailsService.process = false;
          this.notification.showSuccess("Updated Successfully!...");
          this.GetProposal_view();
      } else {
        this.notification.showError(res.description)
        this.projectdetailsService.process = false;
        return false;
      } 
    })

    } else {
      // this.projectdetailsService.applySubmitForm(this.ApplyForm.value,this.project_Id)
    console.log("create",this.ApplyForm.value)
    this.projectdetailsService.save_proposalForm(this.project_Id,this.ApplyForm.value,this.images,this.entity_Id,this.user_Id)
    .subscribe((res) => {
      // if(res.id === undefined){
      //   this.notification.showError(res.description)
      //   return false;
      // }
      // else{
      //   console.log("Apply-submit",res)
      //   this.router.navigate(['projectdetails/projectsummary']);
      // }
      if (res.status == "Success") {
        this.isProposal = true;
        this.isclicked_applySubmitproposal = false;
        this.GetProject_view();
        this.images=[];
        this.array=[];
        this.projectdetailsService.process = false;
        this.notification.showSuccess("Created Successfully!...");
        // this.router.navigate(['projectdetails/projectsummary']);
      } else {
        this.notification.showError(res.description)
        this.projectdetailsService.process = false;
        return false;
      } 
    })

    }
  // }, 2000)
  
  }

  apply(){
    this.vowService.isAuthenticated = false
    this.vowService.logout()
    this.router.navigateByUrl("login")
    localStorage.clear()
  }



  oncancelProject(){
    if(this.proposal_Id){
       this.isProposal = true;
       this.isclicked_applySubmitproposal = false;
       this.isResubmitButton = true;
    } else {
      this.router.navigate(['projectdetails/projectsummary']);
    }
  }

  backnavigate(){
    this.router.navigate(['projectdetails/projectsummary']);
  }



  step = 0;
  setStep(index: number) {
    this.step = index;
  }


  // this is create view
  // showimageHeaderPreviewPDF:boolean
  // showimageHeaderPreview:boolean
  // previewjpgUrls:any;
  // previewpdfurl:any;
  // create_view(files) {
  //   console.log("file data to view ", files)
  //   let stringValue = files.file_name.split('.')
  //   if (stringValue[1] === "PNG" || stringValue[1] === "png" || stringValue[1] === "jpeg" || stringValue[1] === "jpg" || stringValue[1] === "JPG" || stringValue[1] === "JPEG") {
  //     this.showimageHeaderPreview = true
  //     this.showimageHeaderPreviewPDF = false
  //     const reader: any = new FileReader();
  //     reader.readAsDataURL(files);
  //     reader.onload = (_event) => {
  //       this.previewjpgUrls = reader.result
  //     }
  //   }
  //   if (stringValue[1] === "pdf") {
  //     this.showimageHeaderPreview = false
  //     this.showimageHeaderPreviewPDF = true
  //     const reader: any = new FileReader();
  //     reader.readAsDataURL(files);
  //     reader.onload = (_event) => {
  //       this.previewpdfurl = reader.result
  //     }
  //   }
  //   if (stringValue[1] === "csv" || stringValue[1] === "ods" || stringValue[1] === "xlsx" || stringValue[1] === "txt") {
  //     this.showimageHeaderPreview = false
  //     this.showimageHeaderPreviewPDF = false
  //   }
  // }




  // this is view screen
  showimageHeaderAPI: boolean = false
  showimagepdf: boolean = false
  isShowViewPopup: boolean = false
  pdfurl: any
  jpgUrls: string;
  cmsUrl = environment.cmsapiURL
  view_File(file_id, file_name) {
    this.showimagepdf = false
    this.showimageHeaderAPI = false
    // const getToken = localStorage.getItem("sessionData");
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token;
    // const headers = { 'Authorization': 'Token ' + token }
    const headers = { 'Authorization': 'Token ' + environment.apiToken }
    let stringValue = file_name.split('.')
    if (stringValue[1] === "PNG"|| stringValue[1] === "png" || stringValue[1] === "jpeg" || stringValue[1] === "jpg" || stringValue[1] === "JPG" || stringValue[1] === "JPEG") {
        // this.isShowViewPopup = true
        this.showimageHeaderAPI = true
        this.showimagepdf = false
        this.jpgUrls = this.cmsUrl + "docserv/doc_download/" + file_id + '?entity_id=' + this.entity_Id + '&user_id=' + this.user_Id, { 'headers': headers }
    }
   else  if (stringValue[1] === "pdf") {
    // this.isShowViewPopup = true
    this.showimagepdf = true
    this.showimageHeaderAPI = false
    this.projectdetailsService.pdf_view(file_id,this.entity_Id,this.user_Id)
      .subscribe((data) => {
        let binaryData = [];
        binaryData.push(data)
        let downloadUrl = window.URL.createObjectURL(new Blob(binaryData));
        let link = document.createElement('a');
        link.href = downloadUrl;
        this.pdfurl = downloadUrl
      })
    }
    else{
      // this.isShowViewPopup = false
      this.showimagepdf = false
      this.showimageHeaderAPI = false
      this.view_fileDownload(file_id, file_name)
    }
  }

// view file download
  view_fileDownload(file_id, file_name) {
    this.projectdetailsService.view_fileDownload(file_id,this.entity_Id,this.user_Id)
      .subscribe((results) => {
        console.log("re", results)
        let binaryData = [];
        binaryData.push(results)
        let downloadUrl = window.URL.createObjectURL(new Blob(binaryData));
        let link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file_name;
        link.click();
      })
  }


 
  qustnTypeList:any;
  // typelist
  getQustnTypeList() {
    this.projectdetailsService.getQustnTypeList(this.project_Id,this.defalutbranchList.branch_code,this.entity_Id,this.user_Id)
    .subscribe((results: any[]) => {
      // this.qustnwithupdate
      // let datas = this.qustnwithupdate
      let datas = results["data"];
      for(let i=0;i<datas.length;i++){
        (i == 0)? datas[i].index = 0: datas[i].index =-1
        datas[i]['questions'] = datas[i]['questions'].sort( (a,b) =>(a.order > b.order ? 1 : -1) )
        datas[i]['header'] = datas[i]['header'].sort( (a,b) =>(a.order > b.order ? 1 : -1) )
        console.log(datas[i]['questions'])
      }  
      this.qustnTypeList = datas;
      console.log("abcd",this.qustnTypeList)
      })
  }


  // anslist:any;
  ans=[];
  answer:any;



  qustnlist=[];
  object="";
  fileobject="";
  type_id:any;
  default_Question=[];
  selectQustn(qustn){
   console.log("selected qustn",qustn)
   this.type_id =  qustn.type.id
  //  if(qustn.is_answer  == true){
  //   this.PremiseEditbtn = qustn.is_answer
  //  } else {
  //   this.PremiseEditbtn = qustn.is_answer
  //  }
  // this.PremiseEditbtn = qustn.is_answer;

   this.qustnlist=[];

    for(let i=0; i< qustn.questions.length;i++){
      let object = qustn.questions[i]
      object['key'] = this.object
      object['filekey'] = []


      for(let j=0; j< qustn.questions[i].sub_question.length;j++){
        let object = qustn.questions[i].sub_question[j]
        object['sub_filekey'] = []
  
       
      }

     
    }

    for(let i=0; i< qustn.questions.length;i++){
      if(qustn.questions[i].ans == null || qustn.questions[i].ans == "" || qustn.questions[i].ans.id == undefined){
        qustn.questions[i].key = 'No'
      } else if(qustn.questions[i].ans.id){
        qustn.questions[i].key = 'Yes'
      }
    }

    

    this.qustnlist.push(qustn)
    console.log("qustnlist",this.qustnlist)

  
  }


// question-file
  questionFileChange(event, type) {
    console.log("file changingarray", type)
    let filesset: any  = [];
    for (var i = 0; i < event.target.files.length; i++) {
      filesset.push(event.target.files[i]);
    }

    type.filekey.push(filesset)

    console.log("selected file in key", type)
    console.log("filearray",this.qustnlist)
  }

  // sub question - file
  sub_questionFileChange(event, type) {
    console.log("file changingarray", type)
    let filesset: any  = [];
    for (var i = 0; i < event.target.files.length; i++) {
      filesset.push(event.target.files[i]);
    }

    type.sub_filekey.push(filesset)

    console.log("selected file in key", type)
    console.log("filearray",this.qustnlist)
  }






  

  // submit question
  qustnArray = [];
  ansresponse_id:any;
  anx:any;
  SubmitQustn(submit_qustn){
    console.log("before-submit",submit_qustn)
    this.qustnArray = [];

 

    for(let i=0; i< submit_qustn.questions.length;i++){

      for(let j=0; j< submit_qustn.questions[i].sub_question.length;j++){

        if(submit_qustn.questions[i].sub_question[j].ans.id){
          this.anx  = submit_qustn.questions[i].sub_question[j].ans.id
        } else{
          this.anx = submit_qustn.questions[i].sub_question[j].ans
        }
        let list ={
          "question_id":submit_qustn.questions[i].sub_question[j].id,
          "answer": this.anx,
          // "answer": submit_qustn.questions[i].sub_question[j].ans,
          "option_type": submit_qustn.questions[i].sub_question[j].input_type,
          } 
          this.qustnArray.push(list);
          console.log("sub-qustarray",this.qustnArray)
      }



      if(submit_qustn.questions[i].ans.id){
        this.anx  = submit_qustn.questions[i].ans.id
      } else{
        this.anx = submit_qustn.questions[i].ans
      }

    let list ={
    "question_id":submit_qustn.questions[i].id,
    // "question_type":submit_qustn.type.id,
    "answer": this.anx,
    // "answer": submit_qustn.questions[i].ans,
    "option_type": submit_qustn.questions[i].input_type,
    // "option_id": submit_qustn.questions[i].input_type,
    // "ref_type": 2,
    // "ref_id": this.proposalView_Id,
    } 
    this.qustnArray.push(list);
    console.log("qustnArray",this.qustnArray)
    }
    

    let dataset = this.qustnArray
    const formData: FormData = new FormData();
    let datavalue = JSON.stringify(dataset)
    formData.append('data', datavalue);

    // for(let i=0; i< submit_qustn.questions.length;i++){
    //   let string_value = "file_"+ submit_qustn.questions[i].id
    //   let file_list = submit_qustn.questions[i].filekey[0]
    //   for(let individual in file_list){
    //     formData.append(string_value, file_list[individual])
    //   }

    // }



    for(let i=0; i< submit_qustn.questions.length;i++){
      let string_value = "file_"+ submit_qustn.questions[i].id
      let file_list = submit_qustn.questions[i].filekey[0]

      for(let j=0; j< submit_qustn.questions[i].sub_question.length;i++){
        let string_value = "file_"+ submit_qustn.questions[i].sub_question[j].id
        let file_list = submit_qustn.questions[i].sub_question[j].sub_filekey[0]
        for(let individual in file_list){
          formData.append(string_value, file_list[individual])
        }
      }

      for(let individual in file_list){
        formData.append(string_value, file_list[individual])
      }
    }


    this.projectdetailsService.submitQustn(formData,this.project_Id,this.defalutbranchList.branch_code,this.type_id,this.entity_Id,this.user_Id)
    .subscribe((res) => {
      console.log("Qustn-res",res)
      // if(res.id === undefined){
      //   this.notification.showError(res.description)
      //   return false;
      // }
      // else{
      //  this.ansresponse_id = res.id;
      //   this.notification.showSuccess("Created Successfully!...");
      //   this.getQustnTypeList();
      // }

      if (res.status == "Success") {
        this.notification.showSuccess("Submitted!...");
        this.getQustnTypeList();
      } else {
        this.notification.showError(res.description)
        return false;
      } 
    })
    
  }

  isShow_Reply = false;
  isClicked_YES = true;
  isClicked_No = false;
  onclickReplyIcon(){
    // console.log("length",replylength)
    // if(length){
    //   this.isShow_Reply = true;
    // } else {
    //   this.isShow_Reply = true;
    // }

  }

  qustnImage_List: any;
  qustnimageView(data) {
    console.log("qustnimage", data.ans.file)
    this.qustnImage_List = data.ans.file
  }

  subqustnImage_list:any;
  sub_qustnimageView(data){
    console.log("subqustnimage view", data.ans.file)
    this.subqustnImage_list = data.ans.file
  }

  qustn_fileDownloadApp(id,file_name){
    this.projectdetailsService.view_fileDownload(id,this.entity_Id,this.user_Id)
      .subscribe((results) => {
        let binaryData = [];
        binaryData.push(results)
        let downloadUrl = window.URL.createObjectURL(new Blob(binaryData));
        let link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file_name;
        link.click();
      })

  }



  
  // project qustn



  prjqustnTypeList:any;
  getprojectQustnList() {
    this.projectdetailsService.getprojectQustnList(this.project_Id,this.proposalView_Id,this.entity_Id,this.user_Id)
    .subscribe((results: any[]) => {
      let datas = results["data"];
      this.prjqustnTypeList = datas;
      console.log("prjqustnTypeList",this.prjqustnTypeList)
      })
  }



  project_qustntype_id:any;
  vendorqustnlist = [];
  selectProjcectQustn(qustn){
      console.log("selected project qustn",qustn)
      this.project_qustntype_id =  qustn.type.id
      this.vendorqustnlist=[];
   
       for(let i=0; i< qustn.questions.length;i++){
         let object = qustn.questions[i]
         object['key'] = this.object
       }
   
       for(let i=0; i< qustn.questions.length;i++){
         if(qustn.questions[i].ans == null || qustn.questions[i].ans == "" || qustn.questions[i].ans.id == undefined){
           qustn.questions[i].key = 'No'
         } else if(qustn.questions[i].ans.id){
           qustn.questions[i].key = 'Yes'
         }
       }
   
       this.vendorqustnlist.push(qustn)
       console.log("vendor_qustnlist",this.vendorqustnlist)
   
      
    }




    projectqustnArray = [];
    // ansresponse_id:any;
    SubmitprojectQustn(submit_qustn){
      console.log("before-submit",submit_qustn)
      this.projectqustnArray = [];
  
      for(let i=0; i< submit_qustn.questions.length;i++){
      let list ={
      "question_id":submit_qustn.questions[i].id,
      "answer": submit_qustn.questions[i].ans,
      } 
      this.projectqustnArray.push(list);
      console.log("project-qustnArray",this.projectqustnArray)
      }
      
      let json ={
        data: this.projectqustnArray
      }


      






      this.projectdetailsService.getprojectQustnSubmitList(json,this.project_Id,this.defalutbranchList.branch_code,this.entity_Id,this.user_Id)
      .subscribe((res) => {
        console.log("Qustn-res",res)
       
        if (res.status == "Success") {
          this.notification.showSuccess("Submitted!...");
          this.getprojectQustnList();
        } else {
          this.notification.showError(res.description)
          return false;
        } 
      })
    }




  // all submit
  allSubmit(){
    this.projectdetailsService.allSubmit(this.project_Id,this.entity_Id,this.user_Id,this.defalutbranchList.branch_code,this.proposal_review,
      this.proposalView_Id,)
      .subscribe(results => {
        console.log("all-submit", results)
        if (results.status == "success") {
          this.projectdetailsService.process = false;
          
          this.notification.showSuccess("Submitted!...");
          this.router.navigate(['projectdetails/projectsummary']);
        } else {
          this.notification.showError(results.description)
          this.projectdetailsService.process = false;
          return false;
        } 
        
      })
  }






























































  legalList:any;
  isShow_legalAgreementGet:boolean = false;
  key:any;
  colorkey:any;
  adcolor: any;
  adcolor1:any;
  getlegalAgreementList() {
    this.projectdetailsService.getlegalAgreementList(this.proposalView_Id,this.entity_Id,this.user_Id)
    .subscribe((results) => {
      this.legalList = results;

      if( 'id' in results){
        this.LA_Id = this.legalList.id;
        this.contentName = this.legalList.agreement
        let keys = this.legalList?.is_accepted
        this.colorkey = this.legalList.is_return

        if (this.colorkey === true) {
          this.adcolor = '#e0e0e0'
          this.adcolor1 = 'white'
        } 
        else {
          this.adcolor = 'white'
          this.adcolor1 = '#e0e0e0'
        }
        if(keys == true){
          this.key = 'YES';
        } else {
          this.key = 'NO';
        }
        this.isShow_legalAgreementGet = true;
        this.getSuperScript();
      } else {
        this.isShow_legalAgreementGet = false
      }
      

      
      })
  }


  LA_Id:any;
  // legalAgreement PDF
  legalAgreementPDF(){
  this.projectdetailsService.legalAgreementPDF(this.LA_Id,this.entity_Id,this.user_Id)
      .subscribe((data) => {
        let binaryData = [];
        binaryData.push(data)
        console.log("class name",new Blob(binaryData))
     
        let downloadUrl = window.URL.createObjectURL(new Blob(binaryData));
        console.log("download url",downloadUrl)
        let link = document.createElement('a');
        link.href = downloadUrl;
        link.download = "Legal Agreement.pdf";
        link.click();

      })
  }


  Accept(){
    this.projectdetailsService.Accept(this.LA_Id,this.entity_Id,this.user_Id)
      .subscribe(results => {
        console.log("all-submit", results)
        if (results.status == "success") {
          this.projectdetailsService.process = false;
          
          this.notification.showSuccess("Accepted!...");
          this.getlegalAgreementList();
        } else {
          this.notification.showError(results.description)
          this.projectdetailsService.process = false;
          return false;
        } 
        
      })

  }


  Return(){
    if(this.content == undefined){
      this.notification.showWarning("Invalid...")
      return true;
    }
    let return_json = {
      "content": this.content
    }
    this.projectdetailsService.Return(return_json,this.LA_Id,this.entity_Id,this.user_Id)
      .subscribe(results => {
        console.log("return", results)
        if (results.status == "success") {
          this.projectdetailsService.process = false;
          
          this.notification.showSuccess("Returned!...");
          this.getlegalAgreementList();
        } else {
          this.notification.showError(results.description)
          this.projectdetailsService.process = false;
          return false;
        } 
        
      },
      error => {
        this.errorHandler.handleError(error);
        this.projectdetailsService.process = false;
      }
      )

  }








  supindex:any
  order:any
  scriptContent: any;
  scriptRemarks: string;
  contentName: any;
  version_count:any;

  getSuperScript() {
    this.projectdetailsService.getSuperScript(this.LA_Id,this.entity_Id,this.user_Id)
      .subscribe(result => {
        let script = result.data;
        this.version_count = result.version
        if(result.superscript != null){
          this.contentName = result.superscript;
        }
        this.superscriptlist = script
        this.supindex = this.superscriptlist.length + 1
         script.forEach((element, index) => {
          let indexValue = index;
          this.scriptContent = element.content;
          for(var i=0;i<element.comments.length;i++){
          this.scriptRemarks = element.comments[i].content;
          
         
          }
         
          let supSript: string = "[" + indexValue + "]"
          let final: string =
            "<b  >" + this.scriptContent + "<sup  title = " + "'" + this.scriptRemarks + "'" + ">" + supSript + "</sup>" + "</b>"
          this.contentName = this.contentName.replace(this.scriptContent, final)
         
        });
        this.getagree_version(this.version_count);
      })
  }






  

  startIndex: number;
  endIndex: number;
  selectText: string;
  content:any;
  isSuperScript: boolean=false;
  MemoStatus_openclosed:any;
  Versioned:boolean;
  reviewpopup:boolean = true;
  bindSelection(event) {
       
 this.content = document.getElementById('para').innerHTML
 this.selectText = window.getSelection().toString();
 let selection = window.getSelection();
 let start = window.getSelection().getRangeAt(0).startOffset
 this.startIndex = start;
 let end = window.getSelection().getRangeAt(0).endOffset
 this.endIndex = end;
 this.highlight();
 if(this.selectText === ""||this.MemoStatus_openclosed ==='CLOSED'||this.Versioned===true || this.reviewpopup===false){
   this.isSuperScript = false;
 }
 else{
   this.isSuperScript = true;
   this.content = document.getElementById('para').innerHTML
 }
// this.content = document.getElementById('para').innerHTML

}


addnumber:any;

highlight() {


  const sel = window.getSelection();
  const range = sel.getRangeAt(0);
  const {
    commonAncestorContainer,
    startContainer,
    endContainer,
    startOffset,
    endOffset,
  } = range;
  const nodes = [];



  console.groupEnd();
  this.addnumber = this.superscriptlist.length + 1



  if (startContainer === endContainer) {
    const span = document.createElement("span");
    span.className = "highlight";
    span.setAttribute('title', this.addnumber);
    span.setAttribute('value', this.addnumber);
    range.surroundContents(span);
    return;
  }

  // get all posibles selected nodes
  function getNodes(childList) {
    console.group("***** getNode: ", childList);
    childList.forEach((node) => {
      const nodeSel = sel.containsNode(node, true);

      // if is not selected
      if (!nodeSel) return;

      const tempStr = node.nodeValue;

      if (node.nodeType === 3 && tempStr.replace(/^\s+|\s+$/gm, "") !== "") {
        nodes.push(node);
      }

      if (node.nodeType === 1) {
        if (node.childNodes) getNodes(node.childNodes);
      }
    });
    console.groupEnd();
  }

  getNodes(commonAncestorContainer.childNodes);


  nodes.forEach((node, index, listObj) => {
    const { nodeValue } = node;
    let text, prevText, nextText;

    if (index === 0) {
      prevText = nodeValue.substring(0, startOffset);
      text = nodeValue.substring(startOffset);
    } else if (index === listObj.length - 1) {
      text = nodeValue.substring(0, endOffset);
      nextText = nodeValue.substring(endOffset);
    } else {
      text = nodeValue;
    }

    const span = document.createElement("span");
    span.className = "highlight";
    span.setAttribute('title', this.addnumber);
    span.setAttribute('value', this.addnumber);
    span.append(document.createTextNode(text));
    const { parentNode } = node;

    parentNode.replaceChild(span, node);

    if (prevText) {
      const prevDOM = document.createTextNode(prevText);
      parentNode.insertBefore(prevDOM, span);
    }

    if (nextText) {
      const nextDOM = document.createTextNode(nextText);
      parentNode.insertBefore(nextDOM, span.nextSibling);
    }
  });

  sel.removeRange(range);

}


updateModel(event) {
  this.content = document.getElementById('para').innerHTML

}


idval:any
superscriptid:any
commentlist:any;
titlesinglevar: any
arraybool: boolean
nonarraybool: boolean
idmatchval: any
popover: boolean = true
comtdate: any
empname:any

@HostListener('document:mouseover', ['$event'])


mouseover(event) {
  if (event.target.matches('.highlight')) { 
     this.title = event.target.innerHTML
    

     this.idval = event.composedPath()[0].attributes.value.value
    
     if (event.composedPath()[1].attributes.length === 0 || event.composedPath()[1].attributes[0].name != "class") {
       this.superscriptlist.forEach((element, index) => {
        
       if (event.composedPath()[0].attributes.value.value == element.order) {
         this.superscriptid= element.id
         let a=element.order
         
           let listvalue = this.superscriptlist
           for(var i=0;i<listvalue.length;i++){
            if(a == listvalue[i].order){
              this.commentlist = listvalue[i].comments
             }
          }
       
           this.nonarraybool = true
           this.arraybool = false
           }
       })
       this.nonarraybool = true
       this.arraybool = false
       if (this.popover === true) {
         document.getElementById("myCheck").click();
       }
     }
     else {
       this.superscriptlist.forEach((element, index) => {
         let x = 15
         this.arrays = []
         for (var i = 0; i < x; i++) {
           if (event.composedPath()[i].attributes.length === 3) {
             let jsonof = {
               value: event.composedPath()[i].attributes.value.value,
               title: event.composedPath()[i].attributes.title.value
             }
             this.arrays.push(jsonof)
             this.nonarraybool = false
             this.arraybool = true
          }
           else {
                this.wish(event)
                 break;
           }
         }
       })
       this.wish(event)
     }
   }
 }


 
 arrays: any[] = [];
  
 immediate: any[] = [];
 finalist: any[] = [];
 isabc: boolean
 
 wish(e) {
   this.immediate = []
   // this.arrays.sort((a, b) => (a.value > b.value ? 1 : -1))

   var today = new Date();
   var dates = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
   let j = 0

   this.superscriptlist.forEach((element, index) => {
     if (this.arrays[j].value == element.order) {
       let jsons = {
         remarks: element.comments[0].content,
         dates: element.comments[0].created_date,
         employees:element.comments[0].created_by.full_name
       }
       this.immediate.push(jsons)
       j++

     }
     if (this.popover === true) {
       document.getElementById("myCheck").click();


     }

   })
    }


  abc: any
  xyz:any;
  lmn: any;
  hiddenvariable: any
  hiddens: any
    superScriptFormCreate() {
      let dataValue = this.superScriptForm.value;
      if (dataValue.remarks==="" || dataValue.remarks===null) {
        this.notification.showWarning("Invalid remarks")
        return true;
      }
      this.hiddenvariable = document.getElementById('para').innerHTML
      this.abc = this.sanitizer.bypassSecurityTrustHtml(this.contentName)
      this.xyz = this.abc.changingThisBreaksApplicationSecurity
      
      let finale = {
        // content: this.xyz,
        // memo_id: this.mid,
        // ref_id: this.mid,
        // status: "comment",
        // type: 2,
        // super_script: {
          start_index: this.startIndex,
          end_index: this.endIndex,
          comments: dataValue.remarks,
          superscript_content: this.content
          // content: this.content
        // }
      }
      
      // this.SpinnerService.show();
      this.projectdetailsService.superScriptForm(this.LA_Id,finale,this.entity_Id,this.user_Id,)
        .subscribe(result => {
          if (result.status == "success") {
            this.projectdetailsService.process = false;
            this.notification.showSuccess("Success!")
            this.superScriptForm.reset("")
            this.closebutton.nativeElement.click();
            this.contentName = this.content
            this.getSuperScript();
          } else {
            this.notification.showError(result.description)
            this.projectdetailsService.process = false;
            return false;
          } 
  
        }
        ,
        // error => {
        //   // this.SpinnerService.hide();
        // }
        )
    }

    @ViewChild('closebutton') closebutton;
    @ViewChild('closebutton1') closebutton1;
    @ViewChild('closebutton2') closebutton2;
    @ViewChild('popupcontent') popupcontent;

    formatDate(obj) {
      // return new Date(obj);
      return this.datepipe.transform(obj, 'dd-MMM-yyyy h:mm')
    }

    close() {
      if (this.hiddenvariable == undefined) {
        this.hiddenvariable = this.contentName
      }
      document.getElementById('para').innerHTML = this.hiddenvariable
    }

    commentsubmit(){
      // this.SpinnerService.show();
      if(this.superScriptCommentForm.value.remarks === ""){
        // this.SpinnerService.hide();
        this.notification.showError("Please Enter Remarks")
        return false;
      }
      this.projectdetailsService.vendorRemarks(this.superscriptid,this.superScriptCommentForm.value, this.entity_Id,this.user_Id)
        .subscribe(result => {
          if (result.status == "success") {
            this.projectdetailsService.process = false;
            this.notification.showSuccess("Success!")
            this.superScriptCommentForm.reset("")
            this.closebutton1.nativeElement.click();
            this.getSuperScript();
          } else {
            this.notification.showError(result.description)
            this.projectdetailsService.process = false;
            return false;
          } 
        }
        ,
        // error => {
        //   // this.SpinnerService.hide();
        // }
        )
            
      
  
    }


    closepopup() {
      this.titlesinglevar = ""
  
  
    }



    getcheckboxchecked(check, value) {
      console.log(check)
      console.log(value)
      // this.questiondata[i].tablearray[j].tdarray[k].checkboxvalue.push(value.id)
      // console.log(this.questiondata[i].tablearray[j]);
  
  
      if (check == true) {
        // this.questiondata[i].tablearray[j].tdarray[k].checkboxvalue.push(value.id)
      }
      else {
        // this.questiondata[i].tablearray[j].tdarray[k].checkboxvalue.splice( this.questiondata[i].tablearray[j].tdarray[k].checkboxvalue.indexOf(value.id),1)
      }
      // console.log(this.questiondata[i].tablearray[j].tdarray[k])
  
    };






superscriptlist:any;
fetchget:any= [
      {
          "comments": [
              {
                  "can_delete": true,
                  "can_edit": true,
                  "content": "ololo",
                  "created_by": {
                      "designation": null,
                      "full_name": "(empl1) monesh",
                      "id": 7924
                  },
                  "created_date": 1660309671386,
                  "edited": false,
                  "id": 174
              },
              {
                  "can_delete": true,
                  "can_edit": true,
                  "content": "3e3",
                  "created_by": {
                      "designation": null,
                      "full_name": "(empl1) monesh",
                      "id": 7924
                  },
                  "created_date": 1660310172569,
                  "edited": false,
                  "id": 175
              }
          ],
          "end_index": 7,
          "id": 22,
          "order": 5,
          "start_index": 4
      },
      {
          "comments": [
              {
                  "can_delete": true,
                  "can_edit": true,
                  "content": "1234",
                  "created_by": {
                      "designation": null,
                      "full_name": "(empl1) monesh",
                      "id": 7924
                  },
                  "created_date": 1660309514840,
                  "edited": false,
                  "id": 172
              }
          ],
          "end_index": 3,
          "id": 21,
          "order": 4,
          "start_index": 0
      },
      {
          "comments": [
              {
                  "can_delete": true,
                  "can_edit": true,
                  "content": "khok",
                  "created_by": {
                      "designation": null,
                      "full_name": "(empl1) monesh",
                      "id": 7924
                  },
                  "created_date": 1660200534125,
                  "edited": false,
                  "id": 165
              }
          ],
          "end_index": 3,
          "id": 18,
          "order": 3,
          "start_index": 0
      },
      {
          "comments": [
              {
                  "can_delete": true,
                  "can_edit": true,
                  "content": "change to mmm",
                  "created_by": {
                      "designation": null,
                      "full_name": "(empl1) monesh",
                      "id": 7924
                  },
                  "created_date": 1660200256264,
                  "edited": false,
                  "id": 163
              },
              {
                  "can_delete": true,
                  "can_edit": true,
                  "content": "ok",
                  "created_by": {
                      "designation": null,
                      "full_name": "(empl1) monesh",
                      "id": 7924
                  },
                  "created_date": 1660208055122,
                  "edited": false,
                  "id": 166
              }
          ],
          "end_index": 3,
          "id": 17,
          "order": 2,
          "start_index": 0
      },
      {
          "comments": [
              {
                  "can_delete": true,
                  "can_edit": true,
                  "content": "okok",
                  "created_by": {
                      "designation": null,
                      "full_name": "(empl1) monesh",
                      "id": 7924
                  },
                  "created_date": 1660200211782,
                  "edited": false,
                  "id": 161
              }
          ],
          "end_index": 3,
          "id": 16,
          "order": 1,
          "start_index": 0
      }
  ]

























  // qustnwithupdate =[
  //     {
  //       "dept_id": {
  //         "code": "GRP4",
  //         "id": 4,
  //         "name": "CMS Team"
  //       },
  //       "id": 10,
  //       "is_doc": false,
  //       "mapping": [],
  //       "order": 4,
  //       "period": {
  //         "id": 2,
  //         "name": "HALFYEARLY"
  //       },
  //       "questions": [
  //         {
  //           "Input_value": [],
  //           "answer_text": [],
  //           "header_id": {
  //             "id": 23,
  //             "name": "QUESTIONS",
  //             "type": 8
  //           },
  //           "id": 143,
  //           "input_type": {
  //             "id": 2,
  //             "name": "TEXT"
  //           },
  //           "is_score": false,
  //           "max": 0,
  //           "min": 0,
  //           "order": 1,
  //           "question_mapping_id": 74,
  //           "sub_question": [],
  //           "text": "What is your name?"
  //         },
  //         {
  //           "Input_value": [
  //             {
  //               "id": "14",
  //               "options": "B.SC",
  //               "order": 1
  //             },
  //             {
  //               "id": "15",
  //               "options": "BE",
  //               "order": 2
  //             }
  //           ],
  //           "answer_text": [],
  //           "header_id": {
  //             "id": 23,
  //             "name": "QUESTIONS",
  //             "type": 8
  //           },
  //           "id": 145,
  //           "input_type": {
  //             "id": 3,
  //             "name": "RADIO_BUTTON"
  //           },
  //           "is_score": false,
  //           "max": 0,
  //           "min": 0,
  //           "order": 3,
  //           "question_mapping_id": 76,
  //           "sub_question": [],
  //           "text": "what is your education qualification?"
  //         },
  //         {
  //           "Input_value": [],
  //           "answer_text": [],
  //           "header_id": {
  //             "id": 23,
  //             "name": "QUESTIONS",
  //             "type": 8
  //           },
  //           "id": 146,
  //           "input_type": {
  //             "id": 5,
  //             "name": "TEXT_AREA"
  //           },
  //           "is_score": false,
  //           "max": 0,
  //           "min": 0,
  //           "order": 4,
  //           "question_mapping_id": 77,
  //           "sub_question": [
  //             {
  //               "Input_value": [],
  //               "answer_text": [],
  //               "header_id": {
  //                 "id": 23,
  //                 "name": "QUESTIONS",
  //                 "type": 8
  //               },
  //               "id": 149,
  //               "input_type": {
  //                 "id": 2,
  //                 "name": "TEXT"
  //               },
  //               "is_score": false,
  //               "max": 0,
  //               "min": 0,
  //               "order": 1,
  //               "text": "which module currently working?",
  //               "type_id": {
  //                 "id": 8,
  //                 "module_id": 4,
  //                 "name": "TESTQUESTIONNAIRE"
  //               }
  //             }
  //           ],
  //           "text": "TELL ABOUT YOURSELF"
  //         },
  //         {
  //           "Input_value": [],
  //           "answer_text": [],
  //           "header_id": {
  //             "id": 23,
  //             "name": "QUESTIONS",
  //             "type": 8
  //           },
  //           "id": 147,
  //           "input_type": {
  //             "id": 8,
  //             "name": "FILE"
  //           },
  //           "is_score": false,
  //           "max": 0,
  //           "min": 0,
  //           "order": 5,
  //           "question_mapping_id": 78,
  //           "sub_question": [],
  //           "text": "Upload your documents"
  //         },
  //         {
  //           "Input_value": [
  //             {
  //               "id": "16",
  //               "options": "chennai",
  //               "order": 1
  //             },
  //             {
  //               "id": "17",
  //               "options": "abroad",
  //               "order": 2
  //             }
  //           ],
  //           "answer_text": [],
  //           "header_id": {
  //             "id": 23,
  //             "name": "QUESTIONS",
  //             "type": 8
  //           },
  //           "id": 151,
  //           "input_type": {
  //             "id": 4,
  //             "name": "DROP_DOWN"
  //           },
  //           "is_score": false,
  //           "max": 0,
  //           "min": 0,
  //           "order": 2,
  //           "question_mapping_id": 82,
  //           "sub_question": [
  //             {
  //               "Input_value": [],
  //               "answer_text": [],
  //               "header_id": {
  //                 "id": 23,
  //                 "name": "QUESTIONS",
  //                 "type": 8
  //               },
  //               "id": 152,
  //               "input_type": {
  //                 "id": 2,
  //                 "name": "TEXT"
  //               },
  //               "is_score": false,
  //               "max": 0,
  //               "min": 0,
  //               "order": 1,
  //               "text": "where you wana go",
  //               "type_id": {
  //                 "id": 8,
  //                 "module_id": 4,
  //                 "name": "TESTQUESTIONNAIRE"
  //               }
  //             }
  //           ],
  //           "text": "where you live"
  //         },
  //         {
  //           "Input_value": [
  //             {
  //               "id": "16",
  //               "options": "chennai",
  //               "order": 1
  //             },
  //             {
  //               "id": "17",
  //               "options": "abroad",
  //               "order": 2
  //             }
  //           ],
  //           "answer_text": [],
  //           "header_id": {
  //             "id": 23,
  //             "name": "QUESTIONS",
  //             "type": 8
  //           },
  //           "id": 151,
  //           "input_type": {
  //             "id": 4,
  //             "name": "CHECK_BOX"
  //           },
  //           "is_score": false,
  //           "max": 0,
  //           "min": 0,
  //           "order": 2,
  //           "question_mapping_id": 82,
  //           "sub_question": [
  //           ],
  //           "text": "where are you?"
  //         }
  //       ],
  //       "header": [
  //         {
  //           "id": 22,
  //           "input_type": null,
  //           "is_input": false,
  //           "name": "Q.NO",
  //           "order": 1
  //         },
  //         {
  //           "id": 23,
  //           "input_type": null,
  //           "is_input": false,
  //           "name": "QUESTIONS",
  //           "order": 2
  //         },
  //         {
  //           "id": 24,
  //           "input_type": {
  //             "id": 2,
  //             "name": "TEXT"
  //           },
  //           "is_input": true,
  //           "name": "ANSWERS",
  //           "order": 3
  //         }
  //       ],
  //       "type": {
  //         "id": 8,
  //         "module_id": 4,
  //         "name": "General"
  //       }
  //     }
  //   ]










































































































dataString = 'Writing experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words long Writing experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words long Writing experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150Writing experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words long words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words longWriting experts recommend using paragraphs of no more than 150 words in three to eight sentences. The length of a paragraph depends on the type of document; if you look online, youll find a hint that paragraphs should be 100 to 200 words long'

getfun(){
  let dataset: any  = this.dataString

  for( let a in dataset){
    console.log(new Date())
    console.log(dataset.substring(dataset[a]))
  }
}












}





class projectApply {
  name: any;
  budget:any;
  proposer_code: any;
  content:any;
  file_remove:any;
  is_vendor:any;
  
}