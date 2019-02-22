import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../services/token.service';
import {Offer} from '../../../classes/offer';
import {OfferService} from '../../../services/offer.service';
import {OfferDataModule} from '../../../modules/offer-data/offer-data.module';
import {Page} from '../../../classes/Page';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private offerService: OfferService,
              public dataModule: OfferDataModule,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  offers: Array<Offer> = this.dataModule.offers;

  ngOnInit() {
    this.dataModule.offerStr.subscribe( (offers: Offer[]) => {
      this.offers = offers;
    });
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

  changePage(pageIndex: number, pageSize: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page: pageIndex,
        size: pageSize
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
    this.dataModule.pageSize = pageSize;
    this.dataModule.pageIndex = pageIndex;
    this.offerService.getAllByFilterPaged(
      this.dataModule.filterOffer,
      pageIndex.toString(),
      pageSize.toString())
      .toPromise()
      .then( (page: Page) => {
        this.dataModule.totalPages = page.totalPages;
        this.dataModule.offers = page.content;
        this.dataModule.totalElements = page.totalElements;
      });
  }
}
