import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  successAlert: boolean = false  
  warningAlert: boolean = false
  infoAlert: boolean = false
  failureAlert: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  errorMessage: string = '';

  gettingMessage(type, message){
      if(type == 'success'){
        this.successAlert = true 
      }
      if(type == 'info'){
        this.infoAlert = true  
      }
      if(type == 'warning'){
        this.warningAlert = true 
      }
      if(type == 'failure'){
        this.failureAlert = true 
      }
      this.errorMessage = message
      console.log("error message", this.errorMessage)

  }




}
