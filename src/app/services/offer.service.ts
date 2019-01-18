import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Offer} from '../classes/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private readonly URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Array<Offer>>(this.URL + '/offers');
  }
}
