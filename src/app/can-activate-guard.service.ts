import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { VowService } from '../app/service/vow.service'



@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService {



  constructor(private router:Router, private vowservice: VowService) { 

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.vowservice.isAuthenticated !=true  ) {
        this.router.navigate(['/login']);
        return false;
      }
    return true;

  }









}
