import { Component, OnInit } from '@angular/core';
import {Offer} from '../../classes/offer';
import {OfferService} from '../../services/offer.service';

@Component({
  selector: 'app-offer-search',
  templateUrl: './offer-search.component.html',
  styleUrls: ['./offer-search.component.css']
})
export class OfferSearchComponent implements OnInit {
  offerName: any;
  bookTitle: any;
  city: any;
  voivodeship: any;
  isSearchOpened: boolean;
  searchBtnName = 'Search';

  constructor(private offerService: OfferService) { }

  ngOnInit() {
  }

  offerSearch() {
    const offer = new Offer();

    offer.offerName = this.checkAssign(this.offerName);
    offer.bookTitle = this.checkAssign(this.bookTitle);
    offer.city = this.checkAssign(this.city);
    offer.voivodeship = this.checkAssign(this.voivodeship);
    console.log(offer);
    this.offerService.getAllByFilter(offer);
  }

  toggleSearch() {
    if (this.isSearchOpened) {
      this.searchBtnName = 'Search';
    } else {
      this.searchBtnName = 'Close';
    }
    this.isSearchOpened = !this.isSearchOpened;
  }

  checkAssign(field: string) {
    if (field === '' || field === ' ') {
      return undefined;
    } else {
      return field;
    }
  }
}
