import {Injectable} from '@angular/core';
import {TokenService} from './token.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public tokenService: TokenService, public router: Router) {
  }

  canActivate(): boolean {
    if (this.tokenService.isTokenExpired()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
