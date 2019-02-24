import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Offer} from '../classes/offer';
import {UserView} from '../classes/userView';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Array<Offer>>(this.URL + '/users');
  }

  get(id: string) {
    return this.http.get<UserView>(this.URL + '/users/' + id);
  }

}
