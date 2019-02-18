import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Offer} from '../classes/offer';
import {Observable, Subject} from 'rxjs';
import {ContentType} from '@angular/http/src/enums';
import {Page} from '../classes/Page';

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

  getShortForMe() {
    return this.http.get<Array<Offer>>(this.URL + '/offers/my/short');
  }

  getShortForMePaged(page: string, pageSize: string) {
    const param = {page: page, limit: pageSize};
    return this.http.get<Page>(this.URL + '/offers/my/short/p', {params: param} );
  }

  add(formData: FormData) {
    return this.http.post<FormData>(this.URL + '/offers', formData);
  }

  modify(offer: Offer) {
    return this.http.put<Offer>(this.URL + '/offers/' + offer.id, offer);
  }

  delete(id: number) {
    return this.http.delete(this.URL + `/offers/${id}`);
  }

  get(id: string) {
    return this.http.get<Offer>(this.URL + `/offers/${id}`);
  }
}
