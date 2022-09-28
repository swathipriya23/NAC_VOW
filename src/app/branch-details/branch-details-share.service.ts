import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BranchDetailsShareService {
  public branchView =new BehaviorSubject<any>(''); 
  public payment_particular =new BehaviorSubject<any>(''); 
  public branchName =new BehaviorSubject<any>('');
  

  constructor() { }
}
