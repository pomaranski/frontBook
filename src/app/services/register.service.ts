import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AppError} from '../errors/appError';
import {catchError, map} from 'rxjs/operators';
import {User} from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(this.URL + '/register', user).pipe(
      catchError((err: HttpErrorResponse) => {
          throw new AppError(err);
      }),
      map((response) => {
        return response;
      }));
  }
}
