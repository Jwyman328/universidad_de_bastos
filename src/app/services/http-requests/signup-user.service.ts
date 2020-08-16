import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestSentStatus } from './RequestSentStatusHandler/RequestSentStatusHandler';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupUserService extends RequestSentStatus {
  constructor(private http: HttpClient) {
    super();
  }


  postSignUpUser(signUpData: any) {
    this.handleRequestSent();
    return this.http.post(
      `${environment.backendAPIBaseUrl}/auth/sign_up`,
      signUpData,
      
    );
  }
}

//http://localhost:5000/auth/sign_up