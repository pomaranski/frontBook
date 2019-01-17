import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {UnauthorizedError} from '../errors/UnauthorizedError';
import {AppError} from '../errors/AppError';

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

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
