import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-description-box-field',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DescriptionBoxFieldComponent),
      multi: true,
    }],
  templateUrl: './description-box-field.component.html',
  styleUrls: ['./description-box-field.component.css']
})
export class DescriptionBoxFieldComponent implements OnInit {

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
