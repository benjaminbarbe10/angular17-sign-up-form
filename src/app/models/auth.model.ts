import { FormControl } from '@angular/forms';

export interface SignUpForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface SignUp {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
}
