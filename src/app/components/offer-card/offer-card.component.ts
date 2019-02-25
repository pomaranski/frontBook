import {AfterContentInit, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Offer} from '../../classes/offer';
import {Observable} from 'rxjs';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css'],
})
export class OfferCardComponent implements OnInit {

  @Input('offer') offer: Offer;

  constructor() {
  }

  ngOnInit() {
  }

  isExpired(): boolean {
    if (this.offer.expires ) {
      const dateOnly = this.offer.expires.split(' ')[0];
      const offerTime = new Date(dateOnly);
      const now = Date.now();
      if (now < offerTime.getTime()) {
        return true;
      }
      return false;
    }
    return false;
  }
}
