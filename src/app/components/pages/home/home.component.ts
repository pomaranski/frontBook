import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../services/token.service';
import {Offer} from '../../../classes/offer';
import {OfferService} from '../../../services/offer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private offerService: OfferService) { }

  offers: Array<Offer>;

  ngOnInit() {
    this.offerService.offers$
      .subscribe(
        (offersObs) => offersObs
          .toPromise()
          .then(offers => this.offers = offers));
    /*
    if (!this.offers) {
      this.offerService.getAll().subscribe(value => {
        console.log('reloaded offers empty');
        this.offers = value;
      });
    }
    */
  }

  areOffersPopulated() {
    if (this.offers !== null) {
      if (this.offers !== undefined) {
        if (this.offers.length !== 0) {
          return true;
        }
      }
    }
    return false;
  }
}
