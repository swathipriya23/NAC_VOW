import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms'
import { ProjectDetailsService } from '../project-details.service';
import { Router } from '@angular/router'
import { ProjectDetailsshareService } from '../project-detailsshare.service';
import { VowSharedService } from 'src/app/service/vow-shared.service';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.scss']
})
export class ProjectSummaryComponent implements OnInit {
 
  projectSummaryList:any;
  projectSearchForm:FormGroup;

  isprojectpage: boolean = true;
  projectpresentpage: number = 1;
  projectpagesize = 10;
  has_projectnext = true;
  has_projectprevious = true;
  entityId:any;
  statusList=[{'id':1,'name':'All'},{'id':2, 'name':'Applied'}];
  send_value:string  = ""
  hasNextSearch_Page:string = "";
  user_Id:any;
  object="";
  branch_code:any;

  constructor(private fb: FormBuilder,private projectdetailsService: ProjectDetailsService,private router: Router,
    private projectdetailsshareservice: ProjectDetailsshareService,private vowshareservice: VowSharedService) { }

  ngOnInit(): void {
    this.entityId = this.vowshareservice.projectscreen_entityID.value;
    let data:any = this.vowshareservice.projectcreen_loginResult.value;
    this.user_Id = data.user_id;
    this.branch_code = data.branch_code;
    console.log("project summary",this.user_Id)
    this.GetProject_Summary(this.send_value,this.projectpresentpage);

    this.projectSearchForm = this.fb.group({
      title: [''],
      status: ['']
    })
  }

   // project summary
   GetProject_Summary(val,pageNumber = 1) {

    this.projectdetailsService.GetProject_SummaryDetails(this.entityId,this.user_Id,this.branch_code,pageNumber,val)
      .subscribe((results: any[]) => {
          console.log("projectsummarydetails", results)
          let datas = results["data"];

          for(let i=0; i< datas.length;i++){
            let object = datas[i]
            object['key'] = this.object
          }

          for(let i=0;i<datas.length;i++){
            if(datas[i].is_applied == true){
              datas[i].key= 'Applied'
            } else if(datas[i].is_applied == false){
              datas[i].key= 'Pending'
            }
          }
          this.projectSummaryList = datas;
          let datapagination = results["pagination"];
          if (this.projectSummaryList.length === 0) {
            this.isprojectpage = false
          }
          if (this.projectSummaryList.length > 0) {
            this.has_projectnext = datapagination.has_next;
            this.has_projectprevious = datapagination.has_previous;
            this.projectpresentpage = datapagination.index;
            this.isprojectpage = true
          }
          this.send_value=""
      })
   
    
  }

  nextClickProject() {
    if (this.has_projectnext === true) {
      this.GetProject_Summary(this.hasNextSearch_Page,this.projectpresentpage + 1)
    }
  }

  previousClickProject() {
    if (this.has_projectprevious === true) {
      this.GetProject_Summary(this.hasNextSearch_Page,this.projectpresentpage - 1)
    }


  }
// projectview
  projectView(list){
    this.projectdetailsshareservice.projectSummaryView.next(list);
    this.projectdetailsshareservice.entity_SumTo_View.next(this.entityId);
    this.router.navigate(['projectdetails/Projectview']);
  }




  status:any;
  statusflag(list){
    if(list.is_applied == true){
      this.status = 'Approved';
    } else if(list.is_applied == false){
      this.status = 'Pending';
    }
  }


resetProject(){
  this.send_value=""
  this.hasNextSearch_Page=""
  this.projectSearchForm=this.fb.group({
    title:[''],
    status:['']
  })
  this.projectpresentpage= 1;
  this.GetProject_Summary(this.send_value,this.projectpresentpage);
}


projectSearch(){
  let form_value = this.projectSearchForm.value;

    if(form_value.title != "")
    {
      this.send_value=this.send_value+"&title="+form_value.title
    }

    if(form_value.status != "")
    {
      if(form_value.status == 1){
        this.send_value=this.send_value+"&title="
      } 
      else {
        this.send_value=this.send_value+"&proposer_code=" + this.branch_code 
      }
      
    }

    this.hasNextSearch_Page = this.send_value
    this.projectpresentpage = 1;
    this.GetProject_Summary(this.send_value,this.projectpresentpage)

  // this.projectdetailsService.getTitleSearch(form_value,this.entityId)
  //     .subscribe(result => {
  //       this.projectSummaryList = result['data']
  //     })
}

// onStatusChange(e){
//   this.GetProject_Summary();
// }
}
