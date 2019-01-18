import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {AppError} from '../../errors/appError';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  clicked = false;
  failed = false;

  form = new FormGroup({
    login: new FormControl('',
      [Validators.required,
        Validators.maxLength(30)]),
    password: new FormControl('',
      [Validators.required,
        Validators.maxLength(30)])
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {

  }

  get login() {
    return this.form.get('login');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    this.clicked = true;
    if (!this.form.valid) {
      return;
    }

    this.authService.login(this.form.value.login, this.form.value.password).subscribe(
      () => {
        this.router.navigate(['home']);
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
