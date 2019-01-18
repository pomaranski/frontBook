import {AfterContentInit, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Offer} from '../../classes/offer';
import {Observable} from 'rxjs';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.css']
})
export class OfferCardComponent implements OnInit {

  @Input('offer') offer: Offer;

  file;

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
    this.fileService.getFile('5c3e2a8599f2124bdc36b0fa').subscribe();
  }

}
