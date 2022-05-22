import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouteConfigLoadEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
 
  

  constructor (private router:Router , private tokenStorage:TokenStorageService){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (this.isAtuhorized(route)) {
    return true;
  }
  this.router.navigate(['login']);
  return false;

}
private isAtuhorized (route:ActivatedRouteSnapshot):boolean{
  const roles = this.tokenStorage.getUser().roles;
  const expectedRoles = route.data.expectedRoles;
  const roleMatches = roles.findIndex((role: any) =>expectedRoles.indexOf(role) !== -1);
  return (roleMatches < 0) ? false : true ;
}



}
