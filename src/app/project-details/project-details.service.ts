import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, retry } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

const cmsUrl = environment.cmsapiURL

const vowUrl = environment.apiURL

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {

  constructor(private http: HttpClient) { }
  isAuthenticated:boolean =  false
  process: boolean = false




  // public Headers = { 'Authorization': 'Token ' + environment.cmsToken }



     // project Summary 
     public GetProject_SummaryDetails(entityId,user_Id,branch_code,pageNumber = 1,val): Observable<any> {
      // const getToken = localStorage.getItem("sessionData")
      // let tokenValue = JSON.parse(getToken);
      // let token = tokenValue.token
      // let json_port = {
      //   "port_id": 1
      // }
      // let jsonValue = Object.assign({}, details,json_port)
      // let data = JSON.stringify(jsonValue)
      // console.log("usercreation", data)
      let params: any = new HttpParams();
      params = params.append('page', pageNumber.toString());
      // params = params.append('pageSize', pageSize.toString());
      const headers = { 'Authorization': 'Token ' + environment.cmsToken }
      // if(val.status == 2){
      //   val.status = branch_code
      // }
      return this.http.get<any>(cmsUrl + 'cmsserv/vow_project?entity_id=' + entityId + '&user_id=' +user_Id + '&page=' + pageNumber + val, {'headers': headers})
      // return this.http.get<any>(vowUrl + 'usrserv/portal_user', {'headers': headers})
      // return this.http.get<any>(cmsUrl + 'cmsserv/vow_project?entity_id=' + entityId + '&user_id=' +user_Id + 'title=' + val.title + '&proposer_code=' + val.branch_code +'&page=' + pageNumber, {'headers': headers})
    }

    

    // particular project View 
    public GetProject_viewDetails(project_Id,entity_Id,user_Id,branch_code): Observable<any> {
      // this.reset();
      // const getToken = localStorage.getItem("sessionData")
      // let tokenValue = JSON.parse(getToken);
      // let token = tokenValue.token
      // console.log("AL", JSON.stringify(branchJson))
      const headers = { 'Authorization': 'Token ' + environment.cmsToken }
      // vow_get_proposer/<proposer_id>
      // return this.http.post<any>(vowUrl + "cmsserv/vow_project/" + project_Id, { 'headers': headers })
      return this.http.get<any>(cmsUrl + "cmsserv/vow_fetchproject/" + project_Id + '?entity_id=' + entity_Id + '&user_id=' + user_Id + '&proposer_code='+ branch_code, { 'headers': headers })
    }

     // default branch dropdown
     public defaultBranch_List(): Observable<any> {
      // const getToken = localStorage.getItem("sessionData")
      // let tokenValue = JSON.parse(getToken);
      // let token = tokenValue.token
      // let data = JSON.stringify(bio)
      // console.log("biojson", data)
      const headers = { 'Authorization': 'Token ' + environment.apiToken }
      return this.http.get<any>(vowUrl + 'usrserv/default_branch',{'headers': headers})
    }

// save proposal
      public save_proposalForm(project_Id:number,CreateList: any, images: any,entity_Id:any,user_Id): Observable<any> {
        let formData = new FormData();
          formData.append('data', JSON.stringify(CreateList));
          if (images !==null){
          for (var i = 0; i < images.length; i++) {
            formData.append("file", images[i]);
          }}
       
        const headers = { 'Authorization': 'Token ' + environment.cmsToken }
        this.process = true
        return this.http.post<any> (cmsUrl + 'cmsserv/vow_proposal/' +  project_Id + '?entity_id=' + entity_Id + '&user_id=' + user_Id,formData,{'headers': headers})
      }


      // resubmit
      public re_SubmitForm(project_Id:number,CreateList: any, images: any,entity_Id:any,proposal_Id:number,user_Id): Observable<any> {
        let formData = new FormData();
       let json = {
        "id": proposal_Id
      }
      let jsonValue = Object.assign({}, CreateList,json)
          formData.append('data', JSON.stringify(jsonValue));
          if (images !==null){
          for (var i = 0; i < images.length; i++) {
            formData.append("file", images[i]);
          }}
       
        const headers = { 'Authorization': 'Token ' + environment.cmsToken }
        this.process = true
        return this.http.post<any> (cmsUrl + 'cmsserv/vow_proposal/' +  project_Id + '?entity_id=' + entity_Id + '&user_id=' + user_Id,formData,{'headers': headers})
      }


    // proposal View 
    public GetProposal_viewDetails(code,project_Id,entity_Id,user_Id): Observable<any> {
      // this.reset();
      // const getToken = localStorage.getItem("sessionData")
      // let tokenValue = JSON.parse(getToken);
      // let token = tokenValue.token
      // console.log("AL", JSON.stringify(branchJson))
      const headers = { 'Authorization': 'Token ' + environment.cmsToken }
      // vow_get_proposer/<proposer_id>
      // return this.http.post<any>(vowUrl + "cmsserv/vow_project/" + project_Id, { 'headers': headers })
      return this.http.get<any>(cmsUrl + "cmsserv/vow_get_proposal/" + project_Id + '?proposer_code='+ code +'&entity_id=' + entity_Id + '&user_id=' +user_Id, { 'headers': headers })
    }

      // get comments View 
      public getComments(project_Id,entity_Id,user_Id): Observable<any> {
        // this.reset();
        // const getToken = localStorage.getItem("sessionData")
        // let tokenValue = JSON.parse(getToken);
        // let token = tokenValue.token
        // console.log("AL", JSON.stringify(branchJson))
        const headers = { 'Authorization': 'Token ' + environment.cmsToken }
        // vow_get_proposer/<proposer_id>
        // return this.http.post<any>(vowUrl + "cmsserv/vow_project/" + project_Id, { 'headers': headers })
        return this.http.get<any>(cmsUrl + "cmsserv/vowcomments/" + project_Id + '?ref_type=2&entity_id=' + entity_Id+ '&user_id=' + user_Id, { 'headers': headers })
      }

       // post Comments
       public onclickCommentForm(CreateList: any, commentimages: any,project_Id,entity_Id,user_Id): Observable<any> {
        // this.reset();
        // const getToken = localStorage.getItem("sessionData")
        // let tokenValue = JSON.parse(getToken);
        // let token = tokenValue.token
        // console.log("AL", JSON.stringify(branchJson))
        let formData = new FormData();
        formData.append('data', JSON.stringify(CreateList));
        if (commentimages !==null){
        for (var i = 0; i < commentimages.length; i++) {
          formData.append("file", commentimages[i]);
        }}
        const headers = { 'Authorization': 'Token ' + environment.cmsToken }
        // vow_get_proposer/<proposer_id>
        // return this.http.post<any>(vowUrl + "cmsserv/vow_project/" + project_Id, { 'headers': headers })
        return this.http.post<any>(cmsUrl + 'cmsserv/vowcomments/' + project_Id + '?ref_type=2&entity_id=' + entity_Id+ '&user_id=' + user_Id, formData, { 'headers': headers })
      }

        // post reply
        public onclickReplyForm(CreateList: any, replyimages: any,comment_Id,project_Id,entity_Id,user_Id): Observable<any> {
          // this.reset();
          // const getToken = localStorage.getItem("sessionData")
          // let tokenValue = JSON.parse(getToken);
          // let token = tokenValue.token
          // console.log("AL", JSON.stringify(branchJson))
          let formData = new FormData();
          formData.append('data', JSON.stringify(CreateList));
          if (replyimages !==null){
          for (var i = 0; i < replyimages.length; i++) {
            formData.append("file", replyimages[i]);
          }}
          const headers = { 'Authorization': 'Token ' + environment.cmsToken }
          // vow_get_proposer/<proposer_id>
          // return this.http.post<any>(vowUrl + "cmsserv/vow_project/" + project_Id, { 'headers': headers })
          return this.http.post<any>(cmsUrl + "cmsserv/vowreply/" + project_Id + '?ref_type=2&reply_id=' + comment_Id+ '&entity_id=' + entity_Id+ '&user_id=' + user_Id, formData, { 'headers': headers })
        }


        // title search
        public getTitleSearch(value,entity_Id): Observable<any> {
          // this.reset();
          // const getToken = localStorage.getItem("sessionData")
          // let tokenValue = JSON.parse(getToken);
          // let token = tokenValue.token
          // const headers = { 'Authorization': 'Token ' + token }
          // if (search.code == null || search.code == '') {
          //   search.code = "''"
          // } if (search.name == null || search.name == '') {
          //   search.name = "''"
          // }
          const headers = { 'Authorization': 'Token ' + environment.cmsToken }
          return this.http.get<any>(cmsUrl + 'cmsserv/vow_project?entity_id=' + entity_Id  + '&user_id=29&title=' + value.title, { 'headers': headers })
        }



        // version dropdown 
        GetVersion(proposal_Id,entity_Id,user_Id){
          const headers = { 'Authorization': 'Token ' + environment.cmsToken }
          return this.http.get<any>(cmsUrl + 'cmsserv/vow_proposal_version/' + proposal_Id + '?entity_id=' +entity_Id + '&user_id=' +user_Id , { 'headers': headers })
        }


          // get selected version
          GetSelectVersion(proposal_Id,version_Id,entity_Id,user_Id){
            const headers = { 'Authorization': 'Token ' + environment.cmsToken }
            return this.http.get<any>(cmsUrl + 'cmsserv/vow_proposal_viewsummary/'+ proposal_Id +'?history_id=' + version_Id + '&entity_id=' + entity_Id + '&user_id=' + user_Id , { 'headers': headers })
          }

            // version dropdown 
        getHistory(proposalView_Id,entity_Id,user_Id){
          const headers = { 'Authorization': 'Token ' + environment.cmsToken }
          return this.http.get<any>(cmsUrl + 'cmsserv/vow_proposal_tranhistory/' + proposalView_Id + '?entity_id=' +entity_Id + '&user_id=' +user_Id , { 'headers': headers })
        } 


     // pdf view
      public pdf_view(fileid,entity_Id,user_Id): Observable<any> {
        // this.reset();
        // let token = '';
        // const getToken = localStorage.getItem("sessionData");
        // if (getToken) {
        //   let tokenValue = JSON.parse(getToken);
        //   token = tokenValue.token
        // }
        const headers = { 'Authorization': 'Token ' + environment.cmsToken }
        return this.http.get<any>(cmsUrl + 'docserv/doc_download/' + fileid + '?entity_id=' +entity_Id + '&user_id=' + user_Id, { headers, responseType: 'blob' as 'json' })
      }

      //file download
      public view_fileDownload(fileid,entity_Id,user_Id): Observable<any> {
        // this.reset();
        // const getToken = localStorage.getItem("sessionData")
        // let tokenValue = JSON.parse(getToken);
        // let token = tokenValue.token
        const headers = { 'Authorization': 'Token ' + environment.cmsToken }
        return this.http.get<any>(cmsUrl + 'docserv/doc_download/' + fileid + '?entity_id=' +entity_Id + '&user_id=' +user_Id ,  { headers, responseType: 'blob' as 'json' })
    
      }


      // vendor_login
      public vendor_signIn(bio: any): Observable<any> {
        // const getToken = localStorage.getItem("sessionData")
        // let tokenValue = JSON.parse(getToken);
        // let token = tokenValue.token
        let data = JSON.stringify(bio)
        // console.log("biojson", data)
        // this.process = true
        // const headers = { 'Authorization': 'Token ' + token }
        return this.http.post<any>(cmsUrl + 'usrserv/auth_token', data)
      }

    //  qustnTypelist
      getQustnTypeList(project_Id,code,entity_Id,user_Id): Observable<any> {
        // const headers = { 'Authorization': 'Token ' + token }
        const headers = { 'Authorization': 'Token ' + environment.cmsToken }
        return this.http.get<any>(cmsUrl + 'cmsserv/vow_questionnaire/' + project_Id + '?proposer_code='+ code + '&entity_id=' +entity_Id + '&user_id=' +user_Id , { 'headers': headers })
          // return this.http.get<any>(cmsUrl + 'venserv/evaluate_vendor/6' + '?entity_id=' +entity_Id + '&user_id=' +user_Id , { 'headers': headers })
      }

    // get answer view api
    getAnsView(type_id,entity_Id,user_Id): Observable<any> {
        const headers = { 'Authorization': 'Token ' + environment.cmsToken }
          return this.http.get<any>(cmsUrl + 'cmsserv/vowquesans?question_type=' + type_id +   '&entity_id=' +entity_Id + '&user_id=' +user_Id , { 'headers': headers })
      }

      //qustnsubmit
      public submitQustn(formData,project_Id,code,type_id,entity_Id,user_Id): Observable<any> {
        // this.reset();
        // const getToken = localStorage.getItem("sessionData")
        // let tokenValue = JSON.parse(getToken);
        // let token = tokenValue.token
        const headers = { 'Authorization': 'Token ' + environment.cmsToken }
        return this.http.post<any>(cmsUrl + 'cmsserv/vow_quesans/' + project_Id+ '?proposer_code='+ code + '&q_type='+ type_id +'&entity_id=' +entity_Id + '&user_id=' +user_Id ,formData,  { 'headers': headers })
    
      }



    // get answer view api
    allSubmit(project_Id,entity_Id,user_Id,code,proposalReview,proposal_Id,): Observable<any> {
      const headers = { 'Authorization': 'Token ' + environment.cmsToken }
      this.process = true
      return this.http.get<any>(cmsUrl + 'cmsserv/proposal_submit/' + project_Id +   '?entity_id=' +entity_Id + '&user_id=' +user_Id + '&proposer_code='+ code + '&proposal_review='+ proposalReview + '&proposal_id=' + proposal_Id, { 'headers': headers })
    }


    //  project qustn list
    getprojectQustnList(project_Id,proposal_Id,entity_Id,user_Id): Observable<any> {
      // const headers = { 'Authorization': 'Token ' + token }
      const headers = { 'Authorization': 'Token ' + environment.cmsToken }
      return this.http.get<any>(cmsUrl + 'cmsserv/vow_projectanswer/' + project_Id + '?proposer_code='+ proposal_Id + '&entity_id=' +entity_Id + '&user_id=' +user_Id , { 'headers': headers })
        // return this.http.get<any>(cmsUrl + 'venserv/evaluate_vendor/6' + '?entity_id=' +entity_Id + '&user_id=' +user_Id , { 'headers': headers })
    }


     //  project qustn submit list
     getprojectQustnSubmitList(json,project_Id,proposal_Id,entity_Id,user_Id): Observable<any> {
      // const headers = { 'Authorization': 'Token ' + token }
      const headers = { 'Authorization': 'Token ' + environment.cmsToken }
      return this.http.post<any>(cmsUrl + 'cmsserv/vow_projectanswer/' + project_Id + '?proposer_code='+ proposal_Id + '&entity_id=' +entity_Id + '&user_id=' +user_Id ,json, { 'headers': headers })
        // return this.http.get<any>(cmsUrl + 'venserv/evaluate_vendor/6' + '?entity_id=' +entity_Id + '&user_id=' +user_Id , { 'headers': headers })
    }


     //  legal agreementlist
     getlegalAgreementList(proposal_Id,entity_Id,user_Id): Observable<any> {
      // const headers = { 'Authorization': 'Token ' + token }
      const headers = { 'Authorization': 'Token ' + environment.cmsToken }
      return this.http.get<any>(cmsUrl + 'cmsserv/vow_legal_agreement_get/' + proposal_Id + '?entity_id=' +entity_Id + '&user_id=' +user_Id , { 'headers': headers })
        // return this.http.get<any>(cmsUrl + 'venserv/evaluate_vendor/6' + '?entity_id=' +entity_Id + '&user_id=' +user_Id , { 'headers': headers })
    }


     // legal pdf 
     public legalAgreementPDF(LA_Id,entity_Id,user_Id): Observable<any> {
      // this.reset();
      // let token = '';
      // const getToken = localStorage.getItem("sessionData");
      // if (getToken) {
      //   let tokenValue = JSON.parse(getToken);
      //   token = tokenValue.token
      // }
      const headers = { 'Authorization': 'Token ' + environment.cmsToken }
      return this.http.get<any>(cmsUrl + 'cmsserv/vow_legal_agreement_download/' + LA_Id + '?entity_id=' +entity_Id + '&user_id=' + user_Id, { headers, responseType: 'blob' as 'json' })
    }
      
    
    Accept(LA_Id,entity_Id,user_Id): Observable<any> {
      const headers = { 'Authorization': 'Token ' + environment.cmsToken }
      this.process = true
      return this.http.post<any>(cmsUrl + 'cmsserv/vow_agreement_accepted/' + LA_Id +   '?entity_id=' +entity_Id + '&user_id=' +user_Id , { 'headers': headers })
    }

    Return(return_json,LA_Id,entity_Id,user_Id): Observable<any> {
      const headers = { 'Authorization': 'Token ' + environment.cmsToken }
      this.process = true
      return this.http.post<any>(cmsUrl + 'cmsserv/vow_agreement_return/' + LA_Id +   '?entity_id=' +entity_Id + '&user_id=' +user_Id , return_json, { 'headers': headers })
    } 


    // get superscript
    public getSuperScript(LA_Id,entity_Id,user_Id): Observable<any> {
      const headers = { 'Authorization': 'Token ' + environment.cmsToken }
      return this.http.get<any>(cmsUrl + 'cmsserv/vow_agreement_superscript/' + LA_Id +'?entity_id=' +entity_Id + '&user_id=' + user_Id, { 'headers': headers })
    }

    // submit superscript
    public superScriptForm(LA_Id,final,entity_Id,user_Id,): Observable<any> {
      const headers = { 'Authorization': 'Token ' + environment.cmsToken }
      this.process = true
      return this.http.post<any>(cmsUrl + 'cmsserv/vow_agreement_superscript/' + LA_Id +'?entity_id=' +entity_Id + '&user_id=' + user_Id, final, { 'headers': headers })
    }

     // vendorRemarks
     public vendorRemarks(superscriptid,json,entity_Id,user_Id): Observable<any> {
      const headers = { 'Authorization': 'Token ' + environment.cmsToken }
      this.process = true
      return this.http.post<any>(cmsUrl + 'cmsserv/vow_superscript_comments/' + superscriptid + '?entity_id=' +entity_Id + '&user_id=' + user_Id, json, { 'headers': headers })
    }

     // get selected agr_version
     selectagr_Version(LA_Id,agr_version_Id,entity_Id,user_Id){
      const headers = { 'Authorization': 'Token ' + environment.cmsToken }
      return this.http.get<any>(cmsUrl + 'cmsserv/vow_agreement_superscript/' + LA_Id +'?version=' + agr_version_Id + '&entity_id=' + entity_Id + '&user_id=' + user_Id , { 'headers': headers })
    }




     
}
