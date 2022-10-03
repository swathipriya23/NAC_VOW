import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class VowSharedService {
  public catcherror =new BehaviorSubject<any>(''); 
  public vendorID = new BehaviorSubject<string>('');
  public vendorDocScreen_loginResult = new BehaviorSubject<string>(''); 
  public entityID = new BehaviorSubject<string>('');
  public projectscreen_entityID = new BehaviorSubject<string>('');
  public loginResult = new BehaviorSubject<string>('');
  public branchDetailScreen_loginResult = new BehaviorSubject<string>('');
  public projectcreen_loginResult = new BehaviorSubject<string>('');


  isLoggedin = false;
  isSideNav = false;
  Loginname = '';
  entity_Name = '';
  portal_id = '';
  portal_code = '';
  Memofrom='';
  loginUserId='';
  loginEmpId='';
  MyModuleName='';
  transactionList= [];
  masterList= [];
  


  constructor() { }
}
