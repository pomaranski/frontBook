import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-required-password-field',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RequiredPasswordFieldComponent),
      multi: true,
    }],
  templateUrl: './required-password-field.component.html',
  styleUrls: ['./required-password-field.component.css']
})
export class RequiredPasswordFieldComponent implements OnInit, ControlValueAccessor {

  @Input('name') name: string;

  value: string;

  onChange: (_: any) => void = (_: any) => {};

  onTouched: () => void = () => {};

  constructor() {
  }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.updateChanges();
  }

  updateChanges() {
    this.onChange(this.value);
  }

  onBlur() {
    this.onTouched();
  }


}
