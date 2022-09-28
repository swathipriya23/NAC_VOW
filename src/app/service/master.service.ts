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
export class MasterService {


  public Headers = { 'Authorization': 'Token ' + environment.apiToken }
  
  constructor(private http: HttpClient) { }


  
public get_PinCode(pincodekeyvalue, pageno): Observable<any> {
  // this.reset();
  // const getToken = localStorage.getItem("sessionData")
  // let tokenValue = JSON.parse(getToken);
  // let token = tokenValue.token
  // if (pincodekeyvalue === null) {
  //   pincodekeyvalue = "";
  // }
  // let urlvalue = vowUrl + 'mstserv/pincodesearch?query=' + pincodekeyvalue + '&page=' + pageno;
  // return this.http.get(urlvalue, {
  //   headers: new HttpHeaders()
  //     .set('Authorization', 'Token ' + token)
  // }
  // )
  const headers = { 'Authorization': 'Token ' + environment.apiToken }
  return this.http.get<any>(vowUrl + 'mstserv/pincode?query=' + pincodekeyvalue + '&page=' + pageno,{'headers': headers})
}

public get_City(pincodekeyvalue, pageno): Observable<any> {
  // this.reset();
  // const getToken = localStorage.getItem("sessionData")
  // let tokenValue = JSON.parse(getToken);
  // let token = tokenValue.token
  // if (pincodekeyvalue === null) {
  //   pincodekeyvalue = "";
  // }
  // let urlvalue = vowUrl + 'mstserv/pincodesearch?query=' + pincodekeyvalue + '&page=' + pageno;
  // return this.http.get(urlvalue, {
  //   headers: new HttpHeaders()
  //     .set('Authorization', 'Token ' + token)
  // }
  // )
  const headers = { 'Authorization': 'Token ' + environment.apiToken }
  return this.http.get<any>(vowUrl + 'mstserv/city?query=' + pincodekeyvalue + '&page=' + pageno,{'headers': headers})
}
public get_District(pincodekeyvalue, pageno): Observable<any> {
  // this.reset();
  // const getToken = localStorage.getItem("sessionData")
  // let tokenValue = JSON.parse(getToken);
  // let token = tokenValue.token
  // if (pincodekeyvalue === null) {
  //   pincodekeyvalue = "";
  // }
  // let urlvalue = vowUrl + 'mstserv/pincodesearch?query=' + pincodekeyvalue + '&page=' + pageno;
  // return this.http.get(urlvalue, {
  //   headers: new HttpHeaders()
  //     .set('Authorization', 'Token ' + token)
  // }
  // )
  const headers = { 'Authorization': 'Token ' + environment.apiToken }
  return this.http.get<any>(vowUrl + 'mstserv/district?query=' + pincodekeyvalue + '&page=' + pageno,{'headers': headers})
}
public get_State(pincodekeyvalue, pageno): Observable<any> {
  // this.reset();
  // const getToken = localStorage.getItem("sessionData")
  // let tokenValue = JSON.parse(getToken);
  // let token = tokenValue.token
  // if (pincodekeyvalue === null) {
  //   pincodekeyvalue = "";
  // }
  // let urlvalue = vowUrl + 'mstserv/pincodesearch?query=' + pincodekeyvalue + '&page=' + pageno;
  // return this.http.get(urlvalue, {
  //   headers: new HttpHeaders()
  //     .set('Authorization', 'Token ' + token)
  // }
  // )
  const headers = { 'Authorization': 'Token ' + environment.apiToken }
  return this.http.get<any>(vowUrl + 'mstserv/state?query=' + pincodekeyvalue + '&page=' + pageno,{'headers': headers})
}


public get_Degree(degreekeyvalue, pageno): Observable<any> {
  // this.reset();
  // const getToken = localStorage.getItem("sessionData")
  // let tokenValue = JSON.parse(getToken);
  // let token = tokenValue.token
  // if (pincodekeyvalue === null) {
  //   pincodekeyvalue = "";
  // }
  // let urlvalue = vowUrl + 'mstserv/pincodesearch?query=' + pincodekeyvalue + '&page=' + pageno;
  // return this.http.get(urlvalue, {
  //   headers: new HttpHeaders()
  //     .set('Authorization', 'Token ' + token)
  // }
  // )
  const headers = { 'Authorization': 'Token ' + environment.apiToken }
  return this.http.get<any>(vowUrl + 'mstserv/degree?query=' + degreekeyvalue + '&page=' + pageno,{'headers': headers})
}

public get_Stream(streamkeyvalue, pageno): Observable<any> {
  // this.reset();
  // const getToken = localStorage.getItem("sessionData")
  // let tokenValue = JSON.parse(getToken);
  // let token = tokenValue.token
  // if (pincodekeyvalue === null) {
  //   pincodekeyvalue = "";
  // }
  // let urlvalue = vowUrl + 'mstserv/pincodesearch?query=' + pincodekeyvalue + '&page=' + pageno;
  // return this.http.get(urlvalue, {
  //   headers: new HttpHeaders()
  //     .set('Authorization', 'Token ' + token)
  // }
  // )
  const headers = { 'Authorization': 'Token ' + environment.apiToken }
  return this.http.get<any>(vowUrl + 'mstserv/stream?query=' + streamkeyvalue + '&page=' + pageno,{'headers': headers})



  
}




        // entity dropdown
        public getEntity_List(): Observable<any> {
          // const getToken = localStorage.getItem("sessionData")
          // let tokenValue = JSON.parse(getToken);
          // let token = tokenValue.token
          // let data = JSON.stringify(bio)
          // console.log("biojson", data)
          const headers = { 'Authorization': 'Token ' + environment.apiToken }
          return this.http.get<any>(vowUrl + 'mstserv/entity',{'headers': headers})
        }
}



