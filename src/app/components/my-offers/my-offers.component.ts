import { Component, OnInit } from '@angular/core';
import {OfferService} from '../../services/offer.service';
import {Offer} from '../../classes/offer';
import {BehaviorSubject} from 'rxjs';
import {Page} from '../../classes/Page';
import {OfferPageButton} from '../../classes/OfferPageButton';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  myOffers: Array<Offer>;
  page = 0;
  pageSize = 5;
  pages = new Array<OfferPageButton>();

  pageHighlightStatus = new Array<boolean>();
  totalPagesCount: number;

  pageNavigationEnabled = true;

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    console.log(this.pageSize);
    this.getOffersPaged(this.page, this.pageSize);
    this.pageHighlightStatus[this.page] = true;
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
        this.page = data.number;
        this.totalPages(data);
        console.log(data);
      });
    this.pageSize = size;
  }

  totalPages(data: Page) {
    this.pageNavigationEnabled = true;
    this.pages = [];
    let after = 0;
    if (this.page > 0) {
      if (data.totalPages - this.page > 1) {
        after = this.page + 1;
      }
      if ( after === 0 ) {
        if ( this.page >= 2 ) {
          this.pages.push(new OfferPageButton( this.page - 2 ));
        }
      }
      if (this.page >= 1) {
        this.pages.push(new OfferPageButton( this.page - 1 ));
      }
      this.pages.push(new OfferPageButton( this.page ));
      if (after !== 0) {
        this.pages.push(new OfferPageButton( after ));
      }
    } else {
      this.pages.push(new OfferPageButton(0));
      if (data.totalPages > 2) {
        after = 2;
      } else if (data.totalPages === 2) {
        after = 1;
      } else {
        this.pageNavigationEnabled = false;
      }
      for (let i = 0; i < after ; i++) {
        this.pages.push(new OfferPageButton(i + 1));
      }
    }
    this.totalPagesCount = data.totalPages;
  }

  selectPage(i: number) {
    this.pageHighlightStatus = [];
    this.pageHighlightStatus[i] = true;
    this.getOffersPaged(i, this.pageSize);
  }

  previous() {
    if (this.page > 0) {
      this.selectPage(this.page - 1);
    }
  }

  next() {
    if (this.page < this.totalPagesCount - 1) {
      this.selectPage(this.page + 1);
    }
  }

  changePageSize(number: number, value: any) {
    this.pageSize = value;
    this.selectPage(number);
  }
}
