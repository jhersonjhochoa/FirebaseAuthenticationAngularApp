import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: AuthService, private route: Router ) {}

  canActivate(): boolean {
    console.log('guard');

    if ( this.auth.isAuthenticated() ) {
      return true;
    } else {
      this.route.navigateByUrl('/login');
      return false;
    }
  }

}
