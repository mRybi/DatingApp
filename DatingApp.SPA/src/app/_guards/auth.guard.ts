import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private authService: AuthService, private router: Router, private alertify: AlertifyService) {

  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if ( this.authService.loggedIn()) {
      return true;
    }

    this.alertify.error('You need to be logged in to acces this area');
    this.router.navigate(['/home']);
    return false;
  }
}
