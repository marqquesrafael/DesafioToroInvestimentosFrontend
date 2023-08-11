import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private router: Router){}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = window.localStorage.getItem('authToken');

     if(token){
      return true;
    }else{
      console.log('Access denied', 'Please login to continue access');
      this.router.navigate(['login']);
      return false;
    }
    

    // if(token){
    //   return true;
    // }else{
    //   this.router.navigate(['login']);
    //   return false;
    // }

  }
  
}
