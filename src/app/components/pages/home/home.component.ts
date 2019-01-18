import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../services/token.service';
import {Offer} from '../../../classes/offer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private tokenService: TokenService) { }

  offer: Offer;

  ngOnInit() {
    this.offer = new Offer();
    this.offer.id = '1';
    this.offer.offerName = 'offerName';
    this.offer.bookTitle = 'bookTitle';
    this.offer.city = 'city';
    this.offer.voivodeship = 'voivodeship';
  }

}
