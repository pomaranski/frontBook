import {Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Offer} from '../../classes/offer';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class OfferDataModule {

  public _offers: Offer[];
  public offersSubj: Subject<Offer[]> = new Subject<Offer[]>();
  public offerStr: Observable<Offer[]> = this.offersSubj.asObservable();
  public pageIndex = 0;
  public pageSize = 10;
  public totalPages: number;
  public totalElements: number;
  public filterOffer: Offer;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  set offers(value: Offer[]) {
    this._offers = value;
    this.offersSubj.next(value);
  }

  get offers() {
    return this._offers;
  }
}
