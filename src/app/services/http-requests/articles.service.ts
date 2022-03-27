import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthDataService } from './userData/user-auth-data.service';

import { environment } from '../../../environments/environment';
//import { book } from 'src/app/models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  token: string;
  constructor(
    private http: HttpClient,
    private userAuthDataService: UserAuthDataService
  ) {
    this.token = this.userAuthDataService.getToken();
  }

  getArticles(): Observable<any> {
    return this.http.get<any>(`${environment.backendAPIBaseUrl}/article`, {
      headers: new HttpHeaders({
        Authorization: `JWT ${this.token}`,
        'Content-Type': 'application/json',
      }),
    });
  }
}
