import { Component, OnInit } from '@angular/core';
import {OfferService} from '../../services/offer.service';
import {Offer} from '../../classes/offer';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  myOffers: Array<Offer>;
  page = 0;
  pageSize = 5;
  totalPagesCount: number;
  pages = new Array<number>();

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    console.log(this.pageSize);
    this.getOffersPaged(this.page, this.pageSize);
  }

  getOffers() {
     this.offerService.getShortForMe().toPromise().then( (data) => {
       this.myOffers = data;
      },
     (error) => {
      console.log(error);
     }
     );
  }

  getOffersPaged(page, size) {
    this.offerService.getShortForMePaged(page, size)
      .toPromise().then((data) => {
        this.myOffers = data.content;
        this.totalPagesCount = data.totalPages;
        this.page = data.number;
        this.totalPages();
        console.log(data);
      });
  }

  totalPages() {
    this.pages.length = 0;
    for (let x = this.page; x < this.totalPagesCount; ++x) {
      this.pages.push(x);
    }
  }
}
