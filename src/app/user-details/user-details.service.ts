import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, retry } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

const vowUrl = environment.apiURL

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private http: HttpClient) { }

  public Headers = { 'Authorization': 'Token ' + environment.apiToken }



      // // user Creation 
      // public userCreationForm(details: any): Observable<any> {
      //   // const getToken = localStorage.getItem("sessionData")
      //   // let tokenValue = JSON.parse(getToken);
      //   // let token = tokenValue.token
      //   let json_port = {
      //     "port_id": 1
      //   }
      //   let jsonValue = Object.assign({}, details,json_port)
      //   let data = JSON.stringify(jsonValue)
      //   console.log("usercreation", data)
      //   // const headers = { 'Authorization': 'Token ' + token }
      //   return this.http.post<any>(vowUrl + 'usrserv/portal_user', data,{'headers': this.Headers})
      // }


       // user Summary 
      //  public GetUser_SummaryDetails(): Observable<any> {
      //   // const getToken = localStorage.getItem("sessionData")
      //   // let tokenValue = JSON.parse(getToken);
      //   // let token = tokenValue.token
      //   // let json_port = {
      //   //   "port_id": 1
      //   // }
      //   // let jsonValue = Object.assign({}, details,json_port)
      //   // let data = JSON.stringify(jsonValue)
      //   // console.log("usercreation", data)
        
      //   return this.http.get<any>(vowUrl + 'usrserv/portal_user', {'headers': this.Headers})
      // }



  //       // role dropdown
  // public getRole_Type(): Observable<any> {
  //   // const getToken = localStorage.getItem("sessionData")
  //   // let tokenValue = JSON.parse(getToken);
  //   // let token = tokenValue.token
  //   // let data = JSON.stringify(bio)
  //   // console.log("biojson", data)
  //   // const headers = { 'Authorization': 'Token ' + token }
  //   return this.http.get<any>(vowUrl + 'usrserv/role',{'headers': this.Headers})
  // }



  idleState = 'Not started.';
  timedOut = false;

  // constructor(private http: HttpClient, private idle: Idle, ) { }
  // reset() {
  //   this.idle.watch();
  //   this.idleState = 'Started.';
  //   this.timedOut = false;
  // }

  public getUserSummary(pageno,portal_code): Observable<any> {
    // this.reset();
    const getToken = localStorage.getItem("sessionData")
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(vowUrl + "usrserv/vow_user_summary?code="+ portal_code + '&page=' + pageno, { 'headers': headers })
}


public userCreationForm(usercreation): Observable<any> {
  // this.reset();
  const getToken = localStorage.getItem("sessionData")
  let tokenValue = JSON.parse(getToken);
  let token = tokenValue.token
  console.log("usercreation", JSON.stringify(usercreation))
  const headers = { 'Authorization': 'Token ' + token }
  return this.http.post<any>(vowUrl + "usrserv/portal_user", usercreation, { 'headers': headers })
}

public portaluserActiveInactive(code, status): Observable<any> {
  // this.reset();
  const getToken = localStorage.getItem("sessionData")
  let tokenValue = JSON.parse(getToken);
  let token = tokenValue.token
  const headers = { 'Authorization': 'Token ' + token }
  return this.http.get<any>(vowUrl + "usrserv/user_disable?code="+code+"&status="+status, { 'headers': headers })
}


public getAdmin(admin): Observable<any> {
  // this.reset();
  const getToken = localStorage.getItem("sessionData")
  let tokenValue = JSON.parse(getToken);
  let token = tokenValue.token
  console.log("admin", JSON.stringify(admin))
  const headers = { 'Authorization': 'Token ' + token }
  return this.http.post<any>(vowUrl + "usrserv/forgot_password", admin, { 'headers': headers })
}
}
