import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { nameValidator } from '../../shared/validators/name.validator';
import { emailValidator } from '../../shared/validators/email.validator';
import { passwordValidator } from '../../shared/validators/password.validator';
import { NotificationComponent } from '../../shared/components/notification/notification.component';
import { SignUpForm } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationErrorMessagesComponent } from '../../shared/validation-error-messages/validation-error-messages.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, NotificationComponent, ValidationErrorMessagesComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  signupForm: FormGroup<SignUpForm> = new FormGroup({
    firstName: new FormControl('', [Validators.required, nameValidator()]),
    lastName: new FormControl('', [Validators.required, nameValidator()]),
    email: new FormControl('', {
      validators: [Validators.required, emailValidator()],
    }),
    password: new FormControl('', [Validators.required, passwordValidator()]),
  });

  isLoadingSignup = signal(false);
  isSignupSuccess = signal(false);

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) {}

  submitSignup(): void {
    if (this.signupForm.valid) {
      this.isLoadingSignup.set(true);
      this.authService.signUp(this.signupForm.getRawValue()).subscribe({
        next: () => {
          this.isLoadingSignup.set(false);
          this.isSignupSuccess.set(true);
          this.toastr.success(this.translate.instant('signup.signupSuccessfully'));
        },
        error: (error) => {
          this.isLoadingSignup.set(false);
          this.toastr.error(this.translate.instant('signup.signupError'));
          console.error(error);
        },
      });
    }
  }

  backToSIgnUpPage(): void {
    this.isSignupSuccess.set(false);
    this.signupForm.reset({ firstName: '', lastName: '', email: '', password: '' });
  }
}
