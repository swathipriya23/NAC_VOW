import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsshareService {
  public projectSummaryView =new BehaviorSubject<any>(''); 
  public entity_SumTo_View =new BehaviorSubject<any>(''); 
  

  constructor() { }
}
