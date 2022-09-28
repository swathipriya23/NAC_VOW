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
export class BranchDetailsService {

  constructor(private http: HttpClient) { }

  public Headers = { 'Authorization': 'Token ' + environment.apiToken }



     // branch Summary 
     public GetBranch_SummaryDetails(): Observable<any> {
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
      return this.http.get<any>(vowUrl + 'venserv/proposer', {'headers': this.Headers})
    }

    // branch ceration
    public branchFormCreate(branchJson): Observable<any> {
      // this.reset();
      // const getToken = localStorage.getItem("sessionData")
      // let tokenValue = JSON.parse(getToken);
      // let token = tokenValue.token
      // console.log("AL", JSON.stringify(branchJson))
      // const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(vowUrl + "venserv/proposer", branchJson, { 'headers': this.Headers })
    }

    // get_branch_patch
    public Get_branch_patch(branch_Id): Observable<any> {
      // this.reset();
      // const getToken = localStorage.getItem("sessionData")
      // let tokenValue = JSON.parse(getToken);
      // let token = tokenValue.token
      // console.log("AL", JSON.stringify(branchJson))
      // const headers = { 'Authorization': 'Token ' + token }
      return this.http.post<any>(vowUrl + "venserv/proposer/" + branch_Id, { 'headers': this.Headers })
    }


    // get branch Particular data
    public getBranchParticularData(branch_code): Observable<any> {
      // this.reset();
      // const getToken = localStorage.getItem("sessionData")
      // let tokenValue = JSON.parse(getToken);
      // let token = tokenValue.token
      // console.log("AL", JSON.stringify(branchJson))
      // const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(vowUrl + "venserv/proposer_get?code=" + branch_code, { 'headers': this.Headers })
    }


     // get payment summary
     public getpaymentsummary(): Observable<any> {
      // this.reset();
      // const getToken = localStorage.getItem("sessionData")
      // let tokenValue = JSON.parse(getToken);
      // let token = tokenValue.token
      // console.log("AL", JSON.stringify(branchJson))
      // const headers = { 'Authorization': 'Token ' + token }
      return this.http.get<any>(vowUrl + "venserv/payment", { 'headers': this.Headers })
    }

      //branchdropdown
  public branchdropdown(id, query,page): Observable<any> {
    // this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    // let params: any = new HttpParams();

    return this.http.get<any>(vowUrl + "mstserv/ifsc?bank_id=" + id + "&query=" + query, { 'headers': this.Headers })
  }

   // bankdropdown
   public bankdropdown(query): Observable<any> {
    // this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(vowUrl + "mstserv/bank_search?query=" + query, { 'headers': this.Headers })
  }



    public get_bankScroll(bankkeyvalue, pageno): Observable<any> {
             
      // const getToken: any = localStorage.getItem('sessionData')
      // let tokenValue = JSON.parse(getToken);
      // let token = tokenValue.token
      if (bankkeyvalue === null) {
        bankkeyvalue = "";
    }
    let urlvalue = vowUrl + 'mstserv/bank_search?query=' + bankkeyvalue + '&page=' + pageno;
      return this.http.get(urlvalue, { 'headers': this.Headers }
      )
    }
    public get_paymodeScroll(query, pageno): Observable<any> {
      // this.reset();
      // const getToken: any = localStorage.getItem('sessionData')
      // let tokenValue = JSON.parse(getToken);
      // let token = tokenValue.token
      if (query === null) {
        query = "";
    }
    let urlvalue = vowUrl + 'mstserv/paymode_search?query=' + query + '&page=' + pageno;
      return this.http.get(urlvalue,{ 'headers': this.Headers }
      )
    }
    
    
    public get_bankbranchScroll(id,query, pageno): Observable<any> {
      // this.reset();
      // const getToken: any = localStorage.getItem('sessionData')
      // let tokenValue = JSON.parse(getToken);
      // let token = tokenValue.token
      if (query === null) {
        query = "";
    }
    let urlvalue = vowUrl + 'mstserv/bankbranch_search?bank_id='+id+'&query='+query + '&page=' + pageno;
      return this.http.get(urlvalue, { 'headers': this.Headers }
      )
    }


      // paymode dropdown
  public paymodedropdown(query): Observable<any> {
    // this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(vowUrl + "mstserv/paymode_search?query=" + query, { 'headers': this.Headers })
  }

  public branchPayMentCreate(branchPayment): Observable<any> {
    // this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    // console.log("branchPayment", branchPayment)
    return this.http.post<any>(vowUrl + "venserv/payment", branchPayment, { 'headers': this.Headers })
  }


  public paymentActive_Inactive(data): Observable<any> {
    // this.reset();
    // const getToken: any = localStorage.getItem('sessionData')
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.post<any>(vowUrl + 'venserv/active_payment',data , { 'headers': this.Headers })
  }
}


















