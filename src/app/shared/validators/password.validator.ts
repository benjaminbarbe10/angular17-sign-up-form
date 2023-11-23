import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Validates a password.
 * A strong password should have a minimum length, include uppercase and lowercase letters,
 * numbers, and special characters.
 */
export function passwordValidator(): ValidatorFn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (control: AbstractControl): { [key: string]: any } | null => {
    const firstName = control.parent?.get('firstName')?.value;
    const lastName = control.parent?.get('lastName')?.value;
    const hasUpperCase = /[A-Z]+/.test(control.value);
    const hasLowerCase = /[a-z]+/.test(control.value);
    const hasNumbers = /\d+/.test(control.value);
    const isValidLength = control.value.length >= 8;
    const containsFirstName = firstName?.length > 0 && control.value?.toLowerCase().includes(firstName?.toLowerCase());
    const containsLastName = lastName?.length > 0 && control.value?.toLowerCase().includes(lastName?.toLowerCase());
    const valid = hasUpperCase && hasLowerCase && hasNumbers && isValidLength && !containsFirstName && !containsLastName;
    // I could use the following return to show more precisely which criteria are not met:
    return valid
      ? null
      : {
          invalidPassword: {
            hasUpperCase,
            hasLowerCase,
            hasNumbers,
            isValidLength,
            containsFirstName,
            containsLastName,
          },
        };
  };
}
