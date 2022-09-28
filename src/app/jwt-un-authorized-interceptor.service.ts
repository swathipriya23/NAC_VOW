import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { VowService } from '../app/service/vow.service';
@Injectable({
  providedIn: 'root'
})
export class JwtUnAuthorizedInterceptorService {
  constructor(private router: Router, private vowservice: VowService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) =>{
        if (event instanceof HttpResponse){}
      },(error: any) =>{
        if (error instanceof HttpErrorResponse){
          if (error.status == 401 || error.status == 403 || error.status == 400){
            let errorValue = error.error;
            if(errorValue.error){ 
              alert(errorValue.error);
            }
            if(errorValue.detail){
               alert(errorValue.detail);
               if(errorValue.detail==='Invalid token.'){
                localStorage.removeItem("sessionData");
               }
            }
            console.log("unauthorized calling");
            this.router.navigateByUrl('/login');
          } else if(error.status == 0){
            alert("Unable to connect server")
            this.vowservice.process = false;
          }

          else if(error.status === 404){
            alert("Page not found")
            this.vowservice.process = false;
          }
          else if(error.status === 405){
            alert("405 - API Failed, Method not allowed")
            this.vowservice.process = false;
          }
          else if(error.status === 408){
            alert("408 - Request Timeout, Request taking too much time")
            this.vowservice.process = false;
          }
          // else if(error.status === 411){
          //   this.handle411Error(error)
          // }
          else if(error.status === 413){
            alert("413 - 413 Payload Too Large Request entity is larger than limits defined by server. The server might close the connection(The request is larger than the server able to handle)")
            this.vowservice.process = false;
          }
          else if(error.status === 415){
            alert ("415 - Unsupported media type")
            this.vowservice.process = false;
          }
          else if(error.status === 429){
            alert("429 - Too Many Requests, Server Busy")
            this.vowservice.process = false;
          }
          else if(error.status === 500){
            alert("500 - Internal server error, Sending request failed")
            this.vowservice.process = false;
          }
          else if(error.status === 502){
            alert("502 - Got an invalid response")
            this.vowservice.process = false;
          }
          // Gateway Timeout Error means your web server didn't receive a timely response from another server
          else if(error.status === 504){
            alert("504 - 'Server timeout'")
            this.vowservice.process = false;
          }
          else{
            alert(error.status + '.Message:'+error.statusText)
            console.log('jwterror',error.status + '.Message:'+error.statusText)
            this.vowservice.process = false;
          }
        }
      }
    ));
  }
}
