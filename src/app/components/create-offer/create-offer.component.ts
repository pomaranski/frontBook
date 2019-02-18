import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordMatchValidator} from '../../validators/passwordMatchValidator';
import {OfferService} from '../../services/offer.service';
import {AppError} from '../../errors/appError';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  form = new FormGroup({
    offerName: new FormControl('',
      [Validators.required,
        Validators.maxLength(30)]),
    bookTitle: new FormControl('',
      [Validators.required,
        Validators.maxLength(50)]),
    city: new FormControl('',
      [Validators.required,
        Validators.maxLength(30)]),
    voivodeship: new FormControl('',
      [Validators.required,
        Validators.maxLength(30)]),
    description: new FormControl('',
      [Validators.required,
        Validators.maxLength(150)]),
    file: new FormControl('')
  });
  clicked = false;
  failed = false;

  url: string;

  constructor(private offerService: OfferService,
              private router: Router) {
  }

  get offerName() {
    return this.form.get('offerName');
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

  get file() {
    return this.form.get('file');
  }

  ngOnInit() {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file.setValue(file);
      const copied = file;
      const reader = new FileReader();
      reader.onload = () => this.url = reader.result;
      reader.readAsDataURL(copied);
    }
  }

  submit() {
    this.clicked = true;
    if (!this.form.valid) {
      return;
    }

    const input = this.prepareForm();

    this.offerService.add(input).subscribe(
      () => {
        this.router.navigateByUrl('/offer_added');
      },
      (error: AppError) => {
        console.log(error);
        this.failed = true;
        setTimeout(() => {
          this.failed = false;
        }, 5000);
      }
    );
  }

  prepareForm(): FormData {
    const input = new FormData();

    input.append('offerName', this.offerName.value);
    input.append('bookTitle', this.bookTitle.value);
    input.append('city', this.city.value);
    input.append('voivodeship', this.voivodeship.value);
    input.append('description', this.description.value);
    if (this.file.value !== '') {
      input.append('file', this.file.value);
    }

    return input;
  }

}
