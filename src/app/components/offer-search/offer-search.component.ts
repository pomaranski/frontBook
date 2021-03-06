import { Component, OnInit } from '@angular/core';
import {Offer} from '../../classes/offer';
import {OfferService} from '../../services/offer.service';
import {FilterBindingClass} from '../../classes/FilterBindingClass';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {OfferDataModule} from '../../modules/offer-data/offer-data.module';
import {Page} from '../../classes/Page';

@Component({
  selector: 'app-offer-search',
  templateUrl: './offer-search.component.html',
  styleUrls: ['./offer-search.component.css']
})
export class OfferSearchComponent implements OnInit {
  fields = [];
  isSearchOpened: boolean;
  searchBtnName = 'Search';
  filters: Array<FilterBindingClass>;

  filtersActive = false;

  constructor(private offerService: OfferService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public dataModule: OfferDataModule) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe( params => {
      this.fields[0] = params.get('name');
      this.fields[1] = params.get('title');
      this.fields[2] = params.get('city');
      this.fields[3] = params.get('voivodeship');
      if (params.get('page')) {
        this.dataModule.pageIndex = Number(params.get('page'));
      }
      if (params.get('size')) {
        this.dataModule.pageSize = Number(params.get('size'));
      }
      this.queryOffers();
    });
  }

  offerSearch() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        name: this.fields[0],
        title: this.fields[1],
        city: this.fields[2],
        voivodeship: this.fields[3],
        page: this.dataModule.pageIndex,
        size: this.dataModule.pageSize
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }

  queryOffers() {
    const offer = new Offer();

    offer.offerName = this.checkAssign(this.fields[0]);
    offer.bookTitle = this.checkAssign(this.fields[1]);
    offer.city = this.checkAssign(this.fields[2]);
    offer.voivodeship = this.checkAssign(this.fields[3]);

    this.assignFilters(offer);

    this.dataModule.filterOffer = offer;
    this.offerService.getAllByFilterPaged(offer,
      this.dataModule.pageIndex.toString(),
      this.dataModule.pageSize.toString())
      .toPromise()
      .then( (page: Page) => {
        this.dataModule.totalPages = page.totalPages;
        this.dataModule.pageIndex = page.number;
        this.dataModule.offers = page.content;
        this.dataModule.totalElements = page.totalElements;
      });
  }

  toggleSearch() {
    if (this.isSearchOpened) {
      this.searchBtnName = 'Search';
    } else {
      this.searchBtnName = 'Close';
    }
    this.isSearchOpened = !this.isSearchOpened;
  }

  assignFilters(offer: Offer) {
    this.filters = [];
    this.filtersActive = false;
    if (offer.offerName) {
      const name = 'Name';
      const value =  offer.offerName;
      const index = 0;
      const filterBind = new FilterBindingClass(name, value, index);
      this.filters.push(filterBind);
      this.filtersActive = true;
    }
    if (offer.bookTitle) {
      const name = 'Book title';
      const value =  offer.bookTitle;
      const index = 1;
      const filterBind = new FilterBindingClass(name, value, index);
      this.filters.push(filterBind);
      this.filtersActive = true;
    }
    if (offer.city) {
      const name = 'City';
      const value =  offer.city;
      const index = 2;
      const filterBind = new FilterBindingClass(name, value, index);
      this.filters.push(filterBind);
      this.filtersActive = true;
    }
    if (offer.voivodeship) {
      const name = 'Voivodeship';
      const value =  offer.voivodeship;
      const index = 3;
      const filterBind = new FilterBindingClass(name, value, index);
      this.filters.push(filterBind);
      this.filtersActive = true;
    }
  }

  checkAssign(field: any) {
    if (field === '' || field === ' ') {
      return undefined;
    } else {
      return field;
    }
  }

  removeFilter(i: number) {
    this.fields[i] = '';
    this.offerSearch();
  }
}
