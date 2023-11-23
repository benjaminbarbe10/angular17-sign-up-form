import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Validates an email address against common email format rules.
 * Checks for the presence of "@" symbol, domain name, and domain extension.
 */
export function emailValidator(): ValidatorFn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (control: AbstractControl): { [key: string]: any } | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { invalidEmail: { value: control.value } };
  };
}
