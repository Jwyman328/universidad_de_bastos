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

  createNote(videoId, videoTimeNoteTakenInSeconds, noteTitle, noteText) {
    console.log('vtnt', videoTimeNoteTakenInSeconds)
    this.handleRequestSent();
    return this.http.post(
     'http://localhost:5000/notes/',
     {"videoTimeNoteTakenInSeconds":Number(videoTimeNoteTakenInSeconds) , "videoId": videoId, "noteTitle": noteTitle, "noteText":noteText},
     {
      headers: new HttpHeaders({
        Authorization: `JWT ${this.token}`,
        'Content-Type': 'application/json',
      }),
    }
      
    );
  }

  getAllNotesForVideo(videoId){
    this.handleRequestSent();
    return this.http.get(
     `http://localhost:5000/notes/${videoId}`,
     {
      headers: new HttpHeaders({
        Authorization: `JWT ${this.token}`,
        'Content-Type': 'application/json',
      }),
    }
      
    );
  }

  updateNote(noteId,updatedNote){
    this.handleRequestSent();
    return this.http.put(
     `http://localhost:5000/notes/${noteId}`,updatedNote,
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