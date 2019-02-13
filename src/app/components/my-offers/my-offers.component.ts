import { Component, OnInit } from '@angular/core';
import {OfferService} from '../../services/offer.service';
import {Offer} from '../../classes/offer';
import {BehaviorSubject} from 'rxjs';
import {Page} from '../../classes/Page';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {

  myOffers: Array<Offer>;
  page = 0;
  pageSize = 5;
  pages = new Array<number>();

  pageHighlightStatus = new Array<boolean>();
  totalPagesCount: number;

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
      });
    this.pageSize = size;
  }

  totalPages(data: Page) {
    this.pages = [];
    let pagesLimit = this.page + 5;
    if (data.totalPages - this.page < 5) {
      pagesLimit = data.totalPages - this.page;
    }
    if (data.last) {
      pagesLimit = this.page + 1;
    }
    let x = (data.first ? 0 : this.page - 1);
    for (x; x < pagesLimit; ++x) {
      this.pages.push(x);
    }
    this.totalPagesCount = data.totalPages;
  }

  selectPage(i: number) {
    this.pageHighlightStatus = [];
    this.pageHighlightStatus[i] = true;
    console.log(this.pageHighlightStatus);
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
