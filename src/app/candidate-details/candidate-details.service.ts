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
export class CandidateDetailsService {

  constructor(private http: HttpClient) { }

  public Headers = { 'Authorization': 'Token ' + environment.apiToken }

  // candidate info
  public candidate_bio(bio: any): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    let data = JSON.stringify(bio)
    console.log("biojson", data)
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.post<any>(vowUrl + 'usrserv/candidate', data,{'headers': this.Headers})
  }

  // candidate address
  public candidate_address(address: any, Candidate_Id: any): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    let data = JSON.stringify(address)
    console.log("addressjson", data)
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.post<any>(vowUrl + 'usrserv/candidate/' + Candidate_Id + '/candidate_address', data,{'headers': this.Headers})
  }

  // candidate education
  public candidate_education(education: any, Candidate_Id: any): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    let data = JSON.stringify(education)
    console.log("educationjson", data)
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.post<any>(vowUrl + 'usrserv/candidate/' + Candidate_Id + '/candidate_education', data,{'headers': this.Headers})
  }

    // candidate experience
    public candidate_experience(experience: any, Candidate_Id: any): Observable<any> {
      // const getToken = localStorage.getItem("sessionData")
      // let tokenValue = JSON.parse(getToken);
      // let token = tokenValue.token
      let data = JSON.stringify(experience)
      console.log("experiencejson", data)
      // const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(vowUrl + 'usrserv/candidate/' + Candidate_Id + '/candidate_experiences', data,{'headers': this.Headers})
    }

    // candidate info
  public candidate_personaldetails(details: any,Candidate_Id: any): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    let data = JSON.stringify(details)
    console.log("details", data)
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.post<any>(vowUrl + 'usrserv/candidate/' + Candidate_Id + '/candidate_details', data, {'headers': this.Headers})
  }


    // review submit
    public candidateinfo(json): Observable<any> {
      // const getToken = localStorage.getItem("sessionData")
      // let tokenValue = JSON.parse(getToken);
      // let token = tokenValue.token
      let data = JSON.stringify(json)
      console.log("infocode", data)
      // const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(vowUrl + 'usrserv/candidate_info', data , {'headers': this.Headers})
    }


  // candidate get
  public getCandidate_bio(id: number): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // let data = JSON.stringify(bio)
    // console.log("biojson", data)
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(vowUrl + 'usrserv/candidate/' + id,{'headers': this.Headers})
  }


  // Address get
  public getAddress(id: number): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // let data = JSON.stringify(bio)
    // console.log("biojson", data)
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(vowUrl + 'usrserv/candidate_address/' + id,{'headers': this.Headers})
  }


  
  // education get
  public getEducation(id: number): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // let data = JSON.stringify(bio)
    // console.log("biojson", data)
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(vowUrl + 'usrserv/candidate_education_get/' + id,{'headers': this.Headers})
  }


  // work experience get
  public getWorkExperience(id: number): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // let data = JSON.stringify(bio)
    // console.log("biojson", data)
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(vowUrl + 'usrserv/candidate_experiences/' + id,{'headers': this.Headers})
  }

   // personal Details get
   public getPersonalDetails(id: number): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // let data = JSON.stringify(bio)
    // console.log("biojson", data)
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(vowUrl + 'usrserv/candidateper_info/' + id,{'headers': this.Headers})
  }

  // candidate document get
  // public getPersonalDetails(id: number): Observable<any> {
  //   // const getToken = localStorage.getItem("sessionData")
  //   // let tokenValue = JSON.parse(getToken);
  //   // let token = tokenValue.token
  //   // let data = JSON.stringify(bio)
  //   // console.log("biojson", data)
  //   // const headers = { 'Authorization': 'Token ' + token }
  //   return this.http.get<any>(vowUrl + 'usrserv/candidateper_info/' + id)
  // }


  // candidate document create
  public candidateDocument(formdata,Candidate_Id): Observable<any> {
    // this.reset();
    // const getToken = localStorage.getItem("sessionData");
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token;
    // let formData = new FormData();
    
      //  let obj = Object.assign({}, data, vendorId,formdata)
      // formData.append('data', JSON.stringify(obj));
      // if (images !==null){
      // for (var i = 0; i < images.length; i++) {
      //   formData.append("file", images[i]);
      // }}
    
  
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.post<any> (vowUrl+ 'usrserv/candidate_doc/' + Candidate_Id, formdata,{'headers': this.Headers})
  }

  // document_Type
  public getDocument_Type(): Observable<any> {
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // let data = JSON.stringify(bio)
    // console.log("biojson", data)
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(vowUrl + 'mstserv/cand_doc_type',{'headers': this.Headers})
  }
}
