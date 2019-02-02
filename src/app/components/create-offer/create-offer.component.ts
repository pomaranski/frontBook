import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordMatchValidator} from '../../validators/passwordMatchValidator';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('',
      [Validators.maxLength(30)]),
    bookTitle: new FormControl('',
      [Validators.maxLength(50)]),
    city: new FormControl('',
      [Validators.maxLength(30)]),
    voivodeship: new FormControl('',
      [Validators.required,
        Validators.maxLength(30)]),
    description: new FormControl('',
      [Validators.required,
        Validators.maxLength(150)
      ])
  });
  clicked = false;
  failed = false;

  constructor() { }

  get name() {
    return this.form.get('name');
  }

  get bookTitle() {
    return this.form.get('bookTitle');
  }

  get city() {
    return this.form.get('city');
  }

  get voivodeship() {
    return this.form.get('voivodeship');
  }

  get description() {
    return this.form.get('description');
  }

  ngOnInit() {
  }

  nextPart() {
    //this.failed = true;
  }
}
