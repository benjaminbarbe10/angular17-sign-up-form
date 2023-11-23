import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { SignUp } from '../models/auth.model';
import { environment } from '../../environments/environment';
import { expect } from '@jest/globals';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should send a POST request to sign up a user', () => {
    const mockSignUp: SignUp = {
      email: 'test@test.com',
      firstName: 'testFirstName',
      lastName: 'TestLastName',
      password: 'password',
    };

    authService.signUp(mockSignUp).subscribe();

    const req: TestRequest = httpTestingController.expectOne(`${environment.API_URL}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockSignUp);
  });
});
