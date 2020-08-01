import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestSentStatus } from './RequestSentStatusHandler/RequestSentStatusHandler';
import { UserAuthDataService } from './userData/user-auth-data.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends RequestSentStatus  {
  token:string;
  constructor(  private http: HttpClient, private userAuthDataService:UserAuthDataService ) { 
    super()
    this.token = this.userAuthDataService.getToken()
  }

  createNote() {
    console.log('hit')
    this.handleRequestSent();
    return this.http.post(
     'https://universidad-de-bastos.herokuapp.com/notes/',
     {"videoTimeNoteTakenInSeconds":50.5460 , "videoId": "54qfdasfst"},
     {
      headers: new HttpHeaders({
        Authorization: `JWT ${this.token}`,
        'Content-Type': 'application/json',
      }),
    }
      
    );
  }
}
//https://universidad-de-bastos.herokuapp.com/notes/
//'http://localhost:5000/notes/'