import { AbstractControl, ValidatorFn } from '@angular/forms';
import { VALIDATOR_MAX_LENGTH } from '../../../app.constants';

/**
 * Validates a name.
 * A valid name should be a non-empty string, without numbers or special characters,
 * and  a maximum length.
 */
export function nameValidator(): ValidatorFn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (control: AbstractControl): { [key: string]: any } | null => {
    const hasOnlyLetters = /^[a-zA-Z\s]*$/.test(control.value);

    const hasLessThanMaxChars = control.value.trim().length <= VALIDATOR_MAX_LENGTH;

    return hasOnlyLetters && hasLessThanMaxChars ? null : { invalidName: { value: control.value } };
  };
}
