import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class VendorDocShareService {
  public docEdit =new BehaviorSubject<any>('');

  constructor() { }
}
