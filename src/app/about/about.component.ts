import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VowService } from '../service/vow.service';
import { VowSharedService } from '../service/vow-shared.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  sidemenuList:any;
  vendor_ID:any;
  entity_ID:any;
  loginResult:any;

  constructor(private router: Router, private vowService: VowService, private  vowShareService :VowSharedService) { }

  ngOnInit(): void {
    this.vendor_ID = this.vowShareService.vendorID.value
    this.entity_ID = this.vowShareService.entityID.value
    this.loginResult = this.vowShareService.loginResult.value
    this.getMenuUrl();


     
  }


  getMenuUrl() {
    this.vowService.getMenuUrl(this.loginResult.portal_id)
    .subscribe((results: any[]) => {
      let datas = results["data"];
      this.sidemenuList = datas;
      // this.sidemenuList
      let memoUrl= this.sidemenuList[0].url

      if (memoUrl === "/candidateinfo") {
        this.router.navigate(['candidate/candidateinfo']);
        return true;
      }
  
      if (memoUrl === "/usersummary") {
        this.router.navigate(['user/usersummary']);
        return true;
      }
  
      if (memoUrl === "/candidatesummary") {
        this.router.navigate(['candidate/candidatesummary']);
        return true;
      }
  
      if (memoUrl === "/dashboard") {
        this.router.navigate(['candidate/dashboard']);
        return true;
      }
  
      if (memoUrl === "/vendordocsummary") {
        this.vowShareService.vendorDocScreen_loginResult.next(this.loginResult)
        this.router.navigate(['vendordocument/vendordocsummary']);
        return true;
      }
      if (memoUrl === "/branchsummary") {
        this.vowShareService.branchDetailScreen_loginResult.next(this.loginResult)
        this.router.navigate(['branchdetails/branchsummary']);
        return true;
      }
      if (memoUrl === "/projectsummary") {
        this.vowShareService.projectscreen_entityID.next(this.entity_ID)
        this.vowShareService.projectcreen_loginResult.next(this.loginResult)
        this.router.navigate(['projectdetails/projectsummary']);
        return true;
      } 
      if (memoUrl === "/vendor") {
        // console.log("module url data", module.url)
        // this.vowShareService.projectscreen_entityID.next(this.entity_ID)
        // this.vowShareService.projectcreen_loginResult.next(this.loginResult)
        this.router.navigate(['atma/vendorView']);
      //  this.router.navigate(['projectdetails/projectsummary']);
        // console.log("module url data", module.name)
        return true;
      }
    })
  }



  // sidemenuList = [
  //   // { id: 1, name: 'Dashboard', logo: 'speed', url: '/dashboard' },
  //   { id: 2, name: 'Candidate', logo: 'manage_accounts', url: '/candidateinfo' },
  //   // { id: 3, name: 'Summary', logo: 'manage_accounts', url: '/candidatesummary' },
  //   { id: 4, name: 'User', logo: 'person', url: '/usersummary' },
  //   // { id: 5, name: 'Attendence', logo: 'speed', url: '/' },
  //   // { id: 6, name: 'Leave Update', logo: 'manage_accounts', url: '/' },
  //   // { id: 7, name: 'Meeting schedule', logo: 'person', url: '/' },
  //   // { id: 8, name: 'Latest', logo: 'manage_accounts', url: '/' },
  //   { id: 9, name: 'Vendor Document', logo: 'person', url: '/vendordocsummary'},
  //   { id: 10, name: 'Branch Info', logo: 'person', url: '/branchsummary'},
  //   { id: 11, name: 'Project', logo: 'person', url: '/projectsummary'},
  // ]

}
