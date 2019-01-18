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

  image: any;

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
    this.fileService.getFile('5c3e2a8599f2124bdc36b0fa').subscribe(value => {
      this.createImageFromBlob(value);
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.image = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
