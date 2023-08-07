import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as XRegExp from 'xregexp';

export class CustomValidators {
  static unicodeLettersAndSpaces(control: AbstractControl): ValidationErrors | null {
    const regex = XRegExp("^\\p{L}[\\p{L} ']*$");
    return regex.test(control.value) ? null : { pattern: true };
  }

  static unicodeLettersDigitsSpaces(control: AbstractControl): ValidationErrors | null {
    const regex = XRegExp('^[\\p{L}\\p{N} ]*$');
    return regex.test(control.value) ? null : { pattern: true };
  }

  static unicodeLettersDigits(control: AbstractControl): ValidationErrors | null {
    const regex = XRegExp('^[\\p{L}\\p{N}]*$');
    return regex.test(control.value) ? null : { pattern: true };
  }

  static houseNumber(control: AbstractControl): ValidationErrors | null {
    const regex = /^\d+[-\s/]*\d*[A-Za-z]?$/;
    return regex.test(control.value) ? null : { pattern: true };
  }

  static customEmail(control: AbstractControl): ValidationErrors | null {
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return regex.test(control.value) ? null : { pattern: true };
  }

  static customTelephone(control: AbstractControl): ValidationErrors | null {
    const regex = new RegExp('^\\+?[1-9]\\d{1,15}$');
    return regex.test(control.value) ? null : { pattern: true };
  }

  static customZipcode(control: AbstractControl): ValidationErrors | null {
    const regex = /^\d{5,15}$/;
    return regex.test(control.value) ? null : { pattern: true };
  }
}
