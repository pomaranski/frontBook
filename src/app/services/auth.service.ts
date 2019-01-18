import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {UnauthorizedError} from '../errors/unauthorizedError';
import {AppError} from '../errors/appError';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  login(login: string, password: string) {
    return this.http.post<any>(this.URL + '/auth', {login, password}).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          throw new UnauthorizedError(err);
        } else {
          throw new AppError(err);
        }
      }),
      map((response) => {
        console.log(response);
        const token = response.token;
        this.setToken(token);
      }));
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  private setToken(token: string) {
    localStorage.setItem('access_token', token);
  }
}
