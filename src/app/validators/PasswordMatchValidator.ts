import {FormGroup} from '@angular/forms';

export class PasswordMatchValidator {

  static validate(registrationFormGroup: FormGroup) {

    const password = registrationFormGroup.controls.password.value;
    const repeatPassword = registrationFormGroup.controls.repeatPassword.value;

    if (repeatPassword.length <= 0) {
      return null;
    }

    if (repeatPassword !== password) {
      return {
        doesMatchPassword: true
      };
    }

    return null;
  }
}
