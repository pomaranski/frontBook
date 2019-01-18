import {Component, Input, OnInit} from '@angular/core';
import {Offer} from '../../../classes/offer';
import {FileService} from '../../../services/file.service';

@Component({
  selector: 'app-offer-card-image',
  templateUrl: './offer-card-image.component.html',
  styleUrls: ['./offer-card-image.component.css']
})
export class OfferCardImageComponent implements OnInit {

  @Input('offerId') offerId: string;

  constructor(private fileService: FileService) { }

  ngOnInit() {
    console.log(this.offerId);
  }

}
