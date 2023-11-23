import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp } from '../models/auth.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private API_URL = environment.API_URL;

  signUp(signUp: SignUp): Observable<SignUp> {
    return this.http.post<SignUp>(`${this.API_URL}/users`, signUp);
  }
}
