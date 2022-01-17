import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenService } from './services/authen.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyAuthGuard implements CanActivate {
  constructor(private authenService: AuthenService,private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenService.loggedIn()) 
      return true;
    else{
      this.router.navigate(['/login']);
      return false;
    }
    
  }    


}
