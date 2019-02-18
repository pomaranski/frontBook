import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  login(login: string, password: string) {
    return this.http.post<any>(this.URL + '/auth', {login, password}).pipe(
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
