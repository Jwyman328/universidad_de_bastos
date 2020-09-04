import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthDataService } from './userData/user-auth-data.service';
import { RequestSentStatus } from './RequestSentStatusHandler/RequestSentStatusHandler';
import { environment } from '../../../environments/environment';
import { book } from 'src/app/models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService extends RequestSentStatus {

  token: string;
  constructor(
    private http: HttpClient,
    private userAuthDataService: UserAuthDataService
  ) {
    super();
    this.token = this.userAuthDataService.getToken();
  }

  getBooks(): Observable<any> {
    return this.http.get<book[]>(`${environment.backendAPIBaseUrl}/books/`, {
      headers: new HttpHeaders({
        Authorization: `JWT ${this.token}`,
        'Content-Type': 'application/json',
      }),
    });  }



  addBookRead(bookId) {
    this.handleRequestSent();
    return this.http.post(
      `${environment.backendAPIBaseUrl}/books/read/`,
      {
        bookId:bookId
      },
      {
        headers: new HttpHeaders({
          Authorization: `JWT ${this.token}`,
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  removeBookRead(bookId) {
    this.handleRequestSent();
    return this.http.delete(
      `${environment.backendAPIBaseUrl}/books/read/${bookId}`,
      {
        headers: new HttpHeaders({
          Authorization: `JWT ${this.token}`,
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}
