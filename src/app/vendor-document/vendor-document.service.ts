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
export class VendorDocumentService {

  constructor(private http: HttpClient) { }

  public Headers = { 'Authorization': 'Token ' + environment.apiToken }



  //  // user Creation 
  //  public userCreationForm(details: any): Observable<any> {
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
  //   return this.http.post<any>(vowUrl + 'usrserv/portal_user', data)
  // }


   // vendor document Summary 
   public GetVendorDocument_Summary(branch_code): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // let json_port = {
    //   "port_id": 1
    // }
    // let jsonValue = Object.assign({}, details,json_port)
    // let data = JSON.stringify(jsonValue)
    // console.log("usercreation", data)
    // const headers = { 'Authorization': 'Token ' + token }
    const headers = { 'Authorization': 'Token ' + environment.apiToken }
    return this.http.get<any>(vowUrl + 'venserv/ven_document?branch_code=' + branch_code,{'headers': headers})
  }

  public getParentDropDown(docgro, pageno): Observable<any> {
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
    return this.http.get<any>(vowUrl + 'mstserv/documentgroup_search?query=' + docgro + '&page=' + pageno,{'headers': headers})
  }


  public createDocumentForm(branch_code,CreateList: any, images: any): Observable<any> {
    // this.reset();
    // const getToken = localStorage.getItem("sessionData");
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token;
    let formData = new FormData();
    // if (id != "") {
    //   let idValue = {
    //     "id": id,
    //     "document_arr": []
    //   }
      //  let obj = Object.assign({}, CreateList, vendorId)
      formData.append('data', JSON.stringify(CreateList));
      if (images !==null){
      for (var i = 0; i < images.length; i++) {
        formData.append("file", images[i]);
      }}
    // }
    // else {
    //   let document = {
    //     "document_arr": []
    //   }
    //   let ob = Object.assign({}, document, data)
    //   formData.append('data', JSON.stringify(ob));
    //   if (images !==null){
    //   for (var i = 0; i < images.length; i++) {
    //     formData.append("file", images[i]);
    //   }}
    // }
  
    // const headers = { 'Authorization': 'Token ' + token }
    const headers = { 'Authorization': 'Token ' + environment.apiToken }
    return this.http.post<any> (vowUrl+ 'venserv/ven_document?branch_code=' + branch_code, formData,{'headers': headers})
  }


  public documentEditCreateForm(branch_code,docJson, images: any): Observable<any> {
    // this.reset();
    // const getToken = localStorage.getItem("sessionData");
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token;
    let formData = new FormData();
    // if (id != "") {
    //   let idValue = {
    //     "id": id,
    //     "document_arr": []
    //   }
       let obj = Object.assign({}, docJson)
      formData.append('data', JSON.stringify(obj));
      if (images !==null){
      for (var i = 0; i < images.length; i++) {
        formData.append("file", images[i]);
      }}
    // }
    // else {
    //   let document = {
    //     "document_arr": []
    //   }
    //   let ob = Object.assign({}, document, data)
    //   formData.append('data', JSON.stringify(ob));
    //   if (images !==null){
    //   for (var i = 0; i < images.length; i++) {
    //     formData.append("file", images[i]);
    //   }}
    // }
  
    const headers = { 'Authorization': 'Token ' + environment.apiToken }
    return this.http.post<any>(vowUrl + "venserv/ven_document?branch_code="+ branch_code,formData,
    { 'headers': headers })
  }


  
   // vendor document particular
   public getdocumentEdit(doc_Id,branch_code): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // let json_port = {
    //   "port_id": 1
    // }
    // let jsonValue = Object.assign({}, details,json_port)
    // let data = JSON.stringify(jsonValue)
    // console.log("usercreation", data)
    // const headers = { 'Authorization': 'Token ' + token }
    const headers = { 'Authorization': 'Token ' + environment.apiToken }
    return this.http.get<any>(vowUrl + 'venserv/ven_document/' +doc_Id+  '?branch_code=' + branch_code,{'headers': headers})
  }


  public deletedocument(document_Id,branch_code): Observable<any> {
    const headers = { 'Authorization': 'Token ' + environment.apiToken }
    return this.http.delete<any>(vowUrl + 'venserv/ven_document/' + document_Id+ '?branch_code=' + branch_code,{'headers': headers})
  }
}
