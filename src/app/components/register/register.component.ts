import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {PasswordMatchValidator} from '../../validators/passwordMatchValidator';
import {AppError} from '../../errors/appError';
import {RegisterService} from '../../services/register.service';
import {User} from '../../classes/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  clicked = false;
  failed = false;

  form = new FormGroup({
    name: new FormControl('',
      [Validators.required,
        Validators.maxLength(30)]),
    lastName: new FormControl('',
      [Validators.required,
        Validators.maxLength(30)]),
    login: new FormControl('',
      [Validators.required,
        Validators.maxLength(30)]),
    password: new FormControl('',
      [Validators.required,
        Validators.maxLength(30)]),
    repeatPassword: new FormControl('',
      [Validators.required,
        Validators.maxLength(30)
      ]),
    email: new FormControl('',
      [Validators.required,
        Validators.email,
        Validators.maxLength(30)]),
  }, {validators: PasswordMatchValidator.validate.bind(this)});

  constructor(private registerService: RegisterService, private router: Router) {
  }

  ngOnInit() {
  }

  get name() {
    return this.form.get('name');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

  get repeatPassword() {
    return this.form.get('repeatPassword');
  }

  get email() {
    return this.form.get('email');
  }

  onSubmit() {
    this.clicked = true;
    if (!this.form.valid) {
      return;
    }

    const user = new User();
    user.name = this.name.value;
    user.lastName = this.lastName.value;
    user.login = this.login.value;
    user.password = this.password.value;
    user.email = this.email.value;

    console.log(user);

    this.registerService.register(user).subscribe(
      () => {
        this.router.navigate(['login']);
      },
      (error: AppError) => {
        this.failed = true;
        setTimeout(() => {
          this.failed = false;
        }, 5000);
      }
    );
  }


}
