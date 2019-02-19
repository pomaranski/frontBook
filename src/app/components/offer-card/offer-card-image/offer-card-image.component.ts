import {Component, Input, OnInit} from '@angular/core';
import {FileService} from '../../../services/file.service';
import {AppError} from '../../../errors/appError';
import {NotFoundError} from '../../../errors/notFoundError';
import {Offer} from '../../../classes/offer';

@Component({
  selector: 'app-offer-card-image',
  templateUrl: './offer-card-image.component.html',
  styleUrls: ['./offer-card-image.component.css']
})
export class OfferCardImageComponent implements OnInit {

  @Input('offer') offer: Offer;

  image: any;

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
    if (this.offer.fileId) {
      this.fileService.getFile(this.offer.id).subscribe(value => {
          this.createImageFromBlob(value);
        },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
          } else {
            throw error;
          }
        });
    }
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
