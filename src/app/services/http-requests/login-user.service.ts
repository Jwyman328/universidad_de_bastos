import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestSentStatus } from './RequestSentStatusHandler/RequestSentStatusHandler';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginUserService extends RequestSentStatus {
  constructor(private http: HttpClient) {
    super();
  }

  postLoginUser(loginData:any) {
    this.handleRequestSent();
    return this.http.post(
     `${environment.backendAPIBaseUrl}/auth/login`,
      loginData,{headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
    );
  }


}
