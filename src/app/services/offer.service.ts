import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Offer} from '../classes/offer';
import {Page} from '../classes/Page';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private readonly URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Array<Offer>>(this.URL + '/offers');
  }

  getAllByFilter(offer: Offer) {
    return this.http.post<Array<Offer>>(this.URL + '/offers/filter', offer);
  }

  getAllByFilterPaged(offer: Offer, page: string, pageSize: string) {
    const param = {page: page, limit: pageSize};
    return this.http.post<Page>(this.URL + '/offers/filter/p', offer, {params: param} );
  }

  getShortForMe() {
    return this.http.get<Array<Offer>>(this.URL + '/offers/my/short');
  }

  getShortForMePaged(page: string, pageSize: string) {
    const param = {page: page, limit: pageSize};
    return this.http.get<Page>(this.URL + '/offers/my/short/p', {params: param} );
  }

  add(formData: FormData) {
    return this.http.post<Offer>(this.URL + '/offers', formData);
  }

  modify(id: string, formData: FormData) {
    return this.http.put<Offer>(this.URL + `/offers/${id}`, formData);
  }

  delete(id: number) {
    return this.http.delete(this.URL + `/offers/${id}`);
  }

  get(id: string) {
    return this.http.get<Offer>(this.URL + `/offers/${id}`);
  }
}
