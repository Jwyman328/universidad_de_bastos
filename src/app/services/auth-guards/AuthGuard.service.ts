import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Router} from '@angular/router'
import { UserAuthDataService } from '../http-requests/userData/user-auth-data.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private userAuthDataService: UserAuthDataService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | Promise<boolean> | any {

      if ( this.userAuthDataService.getToken()){
          return true;
      }else {
          return this.router.createUrlTree(['/login'])
      }

  }
}
