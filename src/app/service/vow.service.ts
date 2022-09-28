import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators'
// import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'

const url = environment

const vowUrl = environment.apiURL


@Injectable({
  providedIn: 'root'
})
export class VowService {
  
  
  constructor( private http: HttpClient, private router: Router) { }
  public Headers = { 'Authorization': 'Token ' + environment.apiToken }

  isAuthenticated:boolean =  false
  process: boolean = false


  //  Login Data
  // public login(user): Observable<any> {
  //   return this.http.post(memoUrl, user)
  // }

  public login(user) {
    if(user){
      this.process = true

      setTimeout(()=>{                           
        this.router.navigateByUrl('welcome')
        this.isAuthenticated = true
   }, 3000);
      return true
    }
    this.isAuthenticated = false 
    this.process = true
    return false
  }


  public logout(){
    this.isAuthenticated = false
    this.process = false

    return true

  }
  public user_bio(bio: any): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    let data = JSON.stringify(bio)
    console.log("biojson", data)
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.post<any>(vowUrl + 'usrserv/portal_user', data)
  }

  public createLogin(bio: any): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    let data = JSON.stringify(bio)
    console.log("biojson", data)
    this.process = true
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.post<any>(vowUrl + 'usrserv/portal_token', data)
  }

  public signIn(bio: any): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    let data = JSON.stringify(bio)
    // console.log("biojson", data)
    this.process = true
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.post<any>(vowUrl + 'usrserv/register_user', data)
  }

  public getMenuUrl(portal_id): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // let data = JSON.stringify(bio)
    // console.log("biojson", data)
    // this.process = true
    const headers = { 'Authorization': 'Token ' + environment.apiToken }
    return this.http.get<any>(vowUrl + 'usrserv/portal_permissions/' + portal_id, {'headers': headers})
  }

  
}