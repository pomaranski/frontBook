import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-offer-added',
  templateUrl: './offer-added.component.html',
  styleUrls: ['./offer-added.component.css']
})
export class OfferAddedComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
