import { SignUp, SignUpForm } from '../models/auth.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { nameValidator } from '../shared/validators/name.validator';
import { emailValidator } from '../shared/validators/email.validator';
import { passwordValidator } from '../shared/validators/password.validator';

export const mockData: SignUp = {
  firstName: 'Benjamin',
  lastName: 'Barbe',
  email: 'test@mail.com',
  password: '@Password123*',
};
export const mockFormData: FormGroup<SignUpForm> = new FormGroup({
  firstName: new FormControl(mockData.firstName, [Validators.required, nameValidator()]),
  lastName: new FormControl(mockData.lastName, [Validators.required, nameValidator()]),
  email: new FormControl(mockData.email, [Validators.required, emailValidator()]),
  password: new FormControl(mockData.password, [Validators.required, passwordValidator()]),
});
