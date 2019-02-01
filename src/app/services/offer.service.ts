import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Offer} from '../classes/offer';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private offers = new Subject<Observable<Array<Offer>>>();
  offers$ = this.offers.asObservable();

  private readonly URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    const newData = this.http.get<Array<Offer>>(this.URL + '/offers');
    this.offers.next(newData);
    return newData;
  }
  getAllByFilter(offer: Offer) {
    const newData =  this.http.post<Array<Offer>>(this.URL + '/offers/filter', offer);
    this.offers.next(newData);
    return newData;
  }
  add(offer: Offer) {
    return this.http.post<Offer>(this.URL + '/offers', offer);
  }
  modify(offer: Offer) {
    return this.http.put<Offer>(this.URL + '/offers/' + offer.id, offer);
  }

}
