import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OfferService} from '../../services/offer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Offer} from '../../classes/offer';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {FileService} from '../../services/file.service';
import {AppError} from '../../errors/appError';
import {NotFoundError} from '../../errors/notFoundError';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {

  private readonly URL = environment.apiUrl;

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

  image: any;

  offer: Offer;


  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private route: ActivatedRoute, private offerService: OfferService, private fileService: FileService,
              private router: Router, protected tokenService: TokenService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.offerService.get(id).subscribe(
      (value) => {
        this.offer = value;
        this.map();
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
      this.file.setValue(image);
    }
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

  map() {
    this.offerName.setValue(this.offer.offerName);
    this.bookTitle.setValue(this.offer.bookTitle);
    this.city.setValue(this.offer.city);
    this.voivodeship.setValue(this.offer.voivodeship);
    this.description.setValue(this.offer.description);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.image = null;
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

    this.offerService.modify(this.offer.id, input).subscribe(
      () => {
        this.router.navigateByUrl('/my_offers');
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

  chooseFile() {
    this.fileInput.nativeElement.click();
  }

}
