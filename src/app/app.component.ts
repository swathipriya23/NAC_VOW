import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { VowService } from './service/vow.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
// import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from './service/notification.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { VowSharedService} from './service/vow-shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  env = environment
  AfterLogin: boolean = false
  subscription: Subscription;
  title = 'VendorOnWeb';
  vendor_ID:any;
  entity_ID:any;
  loginResult:any;
  userName:any;
  emailname:any;
  cpmyname:any;
  // @HostListener('window:unload', [ '$event' ])
  // unloadHandler(event) {
  //   let confirmation = confirm("Do you want to leave?")
  //   if(confirmation == true ){
  //     this.logout()
  //   }else{
  //     return false
  //   }
    
  // }


  constructor(public vowService: VowService, private notification: NotificationService,
    private router: Router,private vowShareService: VowSharedService) { }

  ngOnInit() {
    if(window){
      console.log("window get ", window)

    }
    this.router.events.pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(event => {
        console.log("event get ", event)
        this.vendor_ID = this.vowShareService.vendorID.value
        this.entity_ID = this.vowShareService.entityID.value
        this.loginResult = this.vowShareService.loginResult.value 
        this.userName = this.loginResult.name
        this.cpmyname = this.loginResult.company_name
        this.emailname = this.loginResult.user_email
        if(this.env.apiToken){
          this.getMenuUrl(this.loginResult.portal_id);
        }
        if (event.id === 2 && event.url === event.urlAfterRedirects) {
          const localdata: any = localStorage.getItem('UserData')
          let authdata = JSON.parse(localdata);
          let loginSelectedTabToken = authdata.token
          let cmsSelectedTabToken = authdata.vendor_token

          if (loginSelectedTabToken) {
            this.vowService.isAuthenticated = true
            this.env.apiToken = loginSelectedTabToken
            this.env.cmsToken = cmsSelectedTabToken
            this.router.navigate(['/welcome']);
            return true
          } else {
            this.vowService.isAuthenticated = false
            this.vowService.process = false 
            this.router.navigate(['/login']);
            localStorage.clear()
          }

        }
      })  
          
  }

  logout() {
    this.vowService.isAuthenticated = false
    this.vowService.logout()
    this.router.navigateByUrl("login")
    localStorage.clear()
  }


  openNav() {
    var e = document.getElementById("rightsidemenu");
    console.log("------->", e.style)
    if (e.style.width == '-5px') {
      e.style.width = '250px';
    }
    else {
      e.style.width = '250px';
    }
  }
  closeNavRight() {
    var e = document.getElementById("rightsidemenu");
    console.log("------->", e.style)
    e.style.width = '0px';

  }

  // sidemenuList = [
  //   { id: 1, name: 'Dashboard', logo: 'speed', url: '/dashboard' },
  //   { id: 2, name: 'Candidate', logo: 'manage_accounts', url: '/candidateinfo' },
  //   { id: 3, name: 'Summary', logo: 'manage_accounts', url: '/candidatesummary' },
  //   { id: 4, name: 'User', logo: 'person', url: '/usersummary' },
  //   { id: 5, name: 'Attendence', logo: 'speed', url: '/' },
  //   { id: 6, name: 'Leave Update', logo: 'manage_accounts', url: '/' },
  //   { id: 7, name: 'Meeting schedule', logo: 'person', url: '/' },
  //   { id: 8, name: 'Latest', logo: 'manage_accounts', url: '/' },
  //   { id: 9, name: 'Vendor Document', logo: 'person', url: '/vendordocsummary'},
  //   { id: 10, name: 'Branch Info', logo: 'person', url: '/branchsummary'},
  //   { id: 11, name: 'Project', logo: 'person', url: '/projectsummary'},
  // ]

  sidemenuList:any;

  getMenuUrl(portal_id) {
    this.vowService.getMenuUrl(portal_id)
    .subscribe((results: any[]) => {
      let datas = results["data"];
      this.sidemenuList = datas;
      console.log("",this.sidemenuList)
    })
  }

  public currentlyClickedCardIndex: number = 0;
  public checkIfCardIsClicked(cardIndex: number): boolean {
    return cardIndex === this.currentlyClickedCardIndex;
  }


  SelectedModule(module,cardIndex) {
    console.log("selected module ", module)
    this.currentlyClickedCardIndex = cardIndex;

    if (module.url === "/candidateinfo") {
      console.log("module url data", module.url)
      this.router.navigate(['candidate/candidateinfo']);
      console.log("module url data", module.name)
      return true;
    }

    if (module.url === "/usersummary") {
      console.log("module url data", module.url)
      this.router.navigate(['user/usersummary']);
      console.log("module url data", module.name)
      return true;
    }

    if (module.url === "/candidatesummary") {
      console.log("module url data", module.url)
      this.router.navigate(['candidate/candidatesummary']);
      console.log("module url data", module.name)
      return true;
    }

    if (module.url === "/dashboard") {
      console.log("module url data", module.url)
      this.router.navigate(['candidate/dashboard']);
      console.log("module url data", module.name)
      return true;
    }

    if (module.url === "/vendordocsummary") {
      console.log("module url data", module.url)
      this.vowShareService.vendorDocScreen_loginResult.next(this.loginResult)
      this.router.navigate(['vendordocument/vendordocsummary']);
      console.log("module url data", module.name)
      return true;
    }
    if (module.url === "/branchsummary") {
      console.log("module url data", module.url)
      this.vowShareService.branchDetailScreen_loginResult.next(this.loginResult)
      this.router.navigate(['branchdetails/branchsummary']);
      console.log("module url data", module.name)
      return true;
    }
    if (module.url === "/projectsummary") {
      console.log("module url data", module.url)
      this.vowShareService.projectscreen_entityID.next(this.entity_ID)
      this.vowShareService.projectcreen_loginResult.next(this.loginResult)
      this.router.navigate(['projectdetails/projectsummary']);
      console.log("module url data", module.name)
      return true;
    }  

  }



  // openNav1() {
  //   document.getElementById("mySidenav").style.width = "250px";
  //   document.getElementById("main").style.marginLeft = "250px";
  // }
  
  // closeNav() {
  //   document.getElementById("mySidenav").style.width = "0";
  //   document.getElementById("main").style.marginLeft= "0";
  // }

  iscondition:boolean = false
  openNavMain() {
    if (this.iscondition) {
      document.getElementById("mySidenav").style.width = "12.02%";
      document.getElementById("maincontent").style.marginLeft = "12%";
      // document.getElementById("sidenavfoot").style.width = "12.02%";
      // this.sharedService.isSideNav = false;
      this.iscondition = false;
    } else {
      document.getElementById("mySidenav").style.width = "50px";
      document.getElementById("maincontent").style.marginLeft = "51px";
      // document.getElementById("sidenavfooter").style.transform = "0.5s";
      // document.getElementById("sidenavfoot").style.width = "50px";

      // this.sharedService.isSideNav = true;
      this.iscondition = true;
    }
  }




  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
