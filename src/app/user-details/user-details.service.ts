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



      // user Creation 
      public userCreationForm(details: any): Observable<any> {
        // const getToken = localStorage.getItem("sessionData")
        // let tokenValue = JSON.parse(getToken);
        // let token = tokenValue.token
        let json_port = {
          "port_id": 1
        }
        let jsonValue = Object.assign({}, details,json_port)
        let data = JSON.stringify(jsonValue)
        console.log("usercreation", data)
        // const headers = { 'Authorization': 'Token ' + token }
        return this.http.post<any>(vowUrl + 'usrserv/portal_user', data,{'headers': this.Headers})
      }


       // user Summary 
       public GetUser_SummaryDetails(): Observable<any> {
        // const getToken = localStorage.getItem("sessionData")
        // let tokenValue = JSON.parse(getToken);
        // let token = tokenValue.token
        // let json_port = {
        //   "port_id": 1
        // }
        // let jsonValue = Object.assign({}, details,json_port)
        // let data = JSON.stringify(jsonValue)
        // console.log("usercreation", data)
        
        return this.http.get<any>(vowUrl + 'usrserv/portal_user', {'headers': this.Headers})
      }



        // role dropdown
  public getRole_Type(): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // let data = JSON.stringify(bio)
    // console.log("biojson", data)
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(vowUrl + 'usrserv/role',{'headers': this.Headers})
  }
}
