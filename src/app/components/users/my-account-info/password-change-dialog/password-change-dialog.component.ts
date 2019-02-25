import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordMatchValidator} from '../../../../validators/passwordMatchValidator';
import {UserService} from '../../../../services/user-service.service';
import {TokenService} from '../../../../services/token.service';
import {isSuccess} from '@angular/http/src/http_utils';

class PasswordChange {
  public oldPassword: string;
  public newPassword: string;
}

@Component({
  selector: 'app-password-change-dialog',
  templateUrl: './password-change-dialog.component.html',
  styleUrls: ['./password-change-dialog.component.css']
})
export class PasswordChangeDialogComponent  {

  form = new FormGroup({
    oldPassword: new FormControl('',
      [Validators.required,
        Validators.maxLength(30)]),
    password: new FormControl('',
      [Validators.required,
        Validators.maxLength(30)]),
    repeatPassword: new FormControl('',
      [Validators.required,
        Validators.maxLength(30)
      ])
  }, {validators: PasswordMatchValidator.validate.bind(this)});

  private passwordChange: PasswordChange = new PasswordChange();

  isSuccess: boolean;

  constructor(
    public dialogRef: MatDialogRef<PasswordChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private tokenService: TokenService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  get oldPassword() {
    return this.form.get('oldPassword');
  }

  get password() {
    return this.form.get('password');
  }

  get repeatPassword() {
    return this.form.get('repeatPassword');
  }

  changePassword() {

    const pc = new PasswordChange();
    pc.newPassword = this.password.value;
    pc.oldPassword = this.oldPassword.value;

    this.userService.changePassword(this.tokenService.decodeToken().userID, pc)
      .toPromise()
      .then( (retValue: number) => {
        if (retValue === 200) {
          this.isSuccess = true;
        }
      });
  }
}
