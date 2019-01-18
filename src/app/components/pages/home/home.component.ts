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
    this.offerService.getAll().subscribe(value => {
      this.offers = value;
    });
  }

}
