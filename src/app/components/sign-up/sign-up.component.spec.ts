import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { SignUpComponent } from './sign-up.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Observable, of, throwError } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { mockData, mockFormData } from '../../mocks/sign-in.mock';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUp, SignUpForm } from '../../models/auth.model';
import { nameValidator } from '../../shared/validators/name.validator';
import { emailValidator } from '../../shared/validators/email.validator';
import { passwordValidator } from '../../shared/validators/password.validator';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  let authService: AuthService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(() => of()),
          },
        },
        {
          provide: ToastrService,
          useValue: {
            success: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('email validation', () => {
    const formData: FormGroup<SignUpForm> = new FormGroup({
      firstName: new FormControl(mockData.firstName, [Validators.required, nameValidator()]),
      lastName: new FormControl(mockData.lastName, [Validators.required, nameValidator()]),
      email: new FormControl(mockData.email, [Validators.required, emailValidator()]),
      password: new FormControl(mockData.password, [Validators.required, passwordValidator()]),
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let authServiceSpy: jest.SpyInstance<Observable<SignUp>, [signUp: SignUp], any>;
    beforeEach(() => {
      authServiceSpy = jest.spyOn(authService, 'signUp').mockImplementation(jest.fn(() => of()));
    });
    it('should not call the AuthService.signUp if email don t have a domain', () => {
      formData.controls.email.setValue('ben@test');
      component.signupForm.setValue(formData.getRawValue());
      component.submitSignup();
      expect(authServiceSpy).not.toHaveBeenCalled();
    });
    it('should not call the AuthService.signUp if email don t have a @', () => {
      formData.controls.email.setValue('bentest.com');
      component.signupForm.setValue(formData.getRawValue());
      component.submitSignup();
      expect(authServiceSpy).not.toHaveBeenCalled();
    });
    it('should call the AuthService.signUp if email is valid', () => {
      formData.controls.email.setValue('ben@test.com');
      component.signupForm.setValue(formData.getRawValue());
      component.submitSignup();
      expect(authServiceSpy).toHaveBeenCalled();
    });
  });

  describe('password validation', () => {
    const formData: FormGroup<SignUpForm> = new FormGroup({
      firstName: new FormControl(mockData.firstName, [Validators.required, nameValidator()]),
      lastName: new FormControl(mockData.lastName, [Validators.required, nameValidator()]),
      email: new FormControl(mockData.email, [Validators.required, emailValidator()]),
      password: new FormControl(mockData.password, [Validators.required, passwordValidator()]),
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let authServiceSpy: jest.SpyInstance<Observable<SignUp>, [signUp: SignUp], any>;
    beforeEach(() => {
      authServiceSpy = jest.spyOn(authService, 'signUp').mockImplementation(jest.fn(() => of()));
    });
    it('should not call the AuthService.signUp if password have less than 8 characters', () => {
      formData.controls.password.setValue('123azeA');
      component.signupForm.setValue(formData.getRawValue());
      component.submitSignup();
      expect(authServiceSpy).not.toHaveBeenCalled();
    });
    it('should not call the AuthService.signUp if password does not contain lower letters', () => {
      formData.controls.password.setValue('123AZEAZE');
      component.signupForm.setValue(formData.getRawValue());
      component.submitSignup();
      expect(authServiceSpy).not.toHaveBeenCalled();
    });
    it('should not call the AuthService.signUp if password does not contain uppercase letters', () => {
      formData.controls.password.setValue('123azeaze');
      component.signupForm.setValue(formData.getRawValue());
      component.submitSignup();
      expect(authServiceSpy).not.toHaveBeenCalled();
    });
    it('should not call the AuthService.signUp if password contain firstName', () => {
      formData.controls.password.setValue('123azeAZE' + mockData.firstName);
      component.signupForm.setValue(formData.getRawValue());
      component.submitSignup();
      expect(authServiceSpy).not.toHaveBeenCalled();
    });
    it('should not call the AuthService.signUp if password contain lastName', () => {
      formData.controls.password.setValue('123azeAZE' + mockData.lastName);
      component.signupForm.setValue(formData.getRawValue());
      component.submitSignup();
      expect(authServiceSpy).not.toHaveBeenCalled();
    });
    it('should call the AuthService.signUp if password is valid', () => {
      formData.controls.password.setValue('123azeAZE');
      component.signupForm.setValue(formData.getRawValue());
      component.submitSignup();
      expect(authServiceSpy).toHaveBeenCalled();
    });
  });

  it('should call AuthService.signUp with valid form data and handle success', () => {
    const authServiceSpy = jest.spyOn(authService, 'signUp').mockImplementation(jest.fn(() => of(mockData)));

    const toastrSuccessSpy = jest.spyOn(toastrService, 'success');
    const toastrErrorSpy = jest.spyOn(toastrService, 'error');

    component.signupForm.setValue(mockFormData.getRawValue());

    component.submitSignup();

    expect(authServiceSpy).toHaveBeenCalledWith(mockData);
    expect(toastrSuccessSpy).toHaveBeenCalled();
    expect(toastrErrorSpy).not.toHaveBeenCalled();
    expect(component.isLoadingSignup()).toBe(false);
  });

  it('should call AuthService.signUp with valid form data and handle error', () => {
    const error = {
      status: 500,
      message: 'Internal server error',
    };
    const authServiceSpy = jest.spyOn(authService, 'signUp').mockImplementation(jest.fn(() => throwError(error)));

    const toastrSuccessSpy = jest.spyOn(toastrService, 'success');
    const toastrErrorSpy = jest.spyOn(toastrService, 'error');

    component.signupForm.setValue(mockFormData.getRawValue());

    component.submitSignup();

    expect(authServiceSpy).toHaveBeenCalledWith(mockData);
    expect(toastrSuccessSpy).not.toHaveBeenCalled();
    expect(toastrErrorSpy).toHaveBeenCalled();
    expect(component.isLoadingSignup()).toBe(false);
  });

  it('should reset form when back to sign up', () => {
    // let's consider sign up success
    const resetSpy = jest.spyOn(component.signupForm, 'reset');
    component.backToSIgnUpPage();
    expect(resetSpy).toHaveBeenCalled();
    expect(component.isSignupSuccess()).toBe(false);
  });
});
