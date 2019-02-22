import { Component, OnInit } from '@angular/core';
import {AppError} from '../../errors/appError';
import {NotFoundError} from '../../errors/notFoundError';
import {ActivatedRoute, Router} from '@angular/router';
import {OfferService} from '../../services/offer.service';
import {FileService} from '../../services/file.service';
import {Offer} from '../../classes/offer';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {
  offer: Offer;
  image: any;

  constructor(private route: ActivatedRoute, private offerService: OfferService, private fileService: FileService,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.offerService.get(id).subscribe(
      (value) => {
        this.offer = value;
      }
    );

    if (this.offer.fileId) {
      this.fileService.getFile(id).subscribe(value => {
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
