import {Component, Directive, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors} from '@angular/forms';


@Component({
  selector: 'app-required-text-field',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RequiredTextFieldComponent),
      multi: true,
    }],
  templateUrl: './required-text-field.component.html',
  styleUrls: ['./required-text-field.component.css'],
})
export class RequiredTextFieldComponent implements OnInit, ControlValueAccessor {

  @Input('name') name: string;

  value: string;

  onChange: (_: any) => void = (_: any) => {
  };

  onTouched: () => void = () => {
  };

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
