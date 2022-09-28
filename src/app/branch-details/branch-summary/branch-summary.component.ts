import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray, FormControl } from '@angular/forms'
import { BranchDetailsService } from '../branch-details.service';
import { Router } from '@angular/router'
import { VowSharedService } from 'src/app/service/vow-shared.service';
import { BranchDetailsShareService } from '../branch-details-share.service'; 

@Component({
  selector: 'app-branch-summary',
  templateUrl: './branch-summary.component.html',
  styleUrls: ['./branch-summary.component.scss']
})
export class BranchSummaryComponent implements OnInit {
  branchsummaryList:any;
  branch_Id:number;

  constructor(private fb: FormBuilder,private branchdetailsService: BranchDetailsService,private router: Router,
    private vowShareService: VowSharedService, private branchDetailShareService: BranchDetailsShareService) { }

  ngOnInit(): void {
    let result:any= this.vowShareService.branchDetailScreen_loginResult.value
    this.branch_Id =  result.branch_id;
    this.GetBranch_Summary();
  }

   // Branch summary details
   GetBranch_Summary() {

    this.branchdetailsService.GetBranch_SummaryDetails()
      .subscribe((results: any[]) => {
          console.log("usersummarydetails", results)
          let datas = results["data"];
          this.branchsummaryList = datas;
      })
   
    
  }

  branchEdit(list){
    this.branchDetailShareService.branchView.next(list);
    this.router.navigate(['branchdetails/branch']);
  }


  branchView(list){
    this.branchDetailShareService.branchView.next(list);
    this.router.navigate(['branchdetails/branchView']);
  }


  // portalCreation(){
  //   this.router.navigate(['branchdetails/branch']);
  // }
}
