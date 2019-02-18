import {Component, OnInit} from '@angular/core';
import {OfferService} from '../../services/offer.service';
import {ActivatedRoute} from '@angular/router';
import {Offer} from '../../classes/offer';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {

  offer: Offer;

  constructor(private route: ActivatedRoute, private offerService: OfferService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.offerService.get(id).subscribe(
      (value) => {
        this.offer = value;
      }
    );
  }

}
