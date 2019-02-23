import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-offers',
  templateUrl: './manage-offers.component.html',
  styleUrls: ['./manage-offers.component.css']
})
export class ManageOffersComponent implements OnInit {
  navLinks: Link[] = [
    {path: '/manage_offers/my_offers', label: 'My offers'},
    {path: '/manage_offers/counter_offers', label: 'Propositions'}
  ];

  constructor() { }

  ngOnInit() {
  }

}

class Link {
  public path: string;
  public label: string;
  constructor(path: string, label: string) {
    this.path = path;
    this.label = label;
  }
}
