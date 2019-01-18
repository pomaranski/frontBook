import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Token} from '../token/token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private helper: JwtHelperService) { }

  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.helper.tokenGetter());
  }

  decodeToken(): Token {
    return this.helper.decodeToken(this.helper.tokenGetter());
  }

  getToken() {
    return this.helper.tokenGetter();
  }
}
