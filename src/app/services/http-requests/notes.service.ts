import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestSentStatus } from './RequestSentStatusHandler/RequestSentStatusHandler';
import { UserAuthDataService } from './userData/user-auth-data.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotesService extends RequestSentStatus {
  token: string;
  constructor(
    private http: HttpClient,
    private userAuthDataService: UserAuthDataService
  ) {
    super();
    this.token = this.userAuthDataService.getToken();
  }

  createNote(videoId, videoTimeNoteTakenInSeconds, noteTitle, noteText) {
    this.handleRequestSent();
    return this.http.post(
      `${environment.backendAPIBaseUrl}/notes/`,
      {
        videoTimeNoteTakenInSeconds: Number(videoTimeNoteTakenInSeconds),
        videoId: videoId,
        noteTitle: noteTitle,
        noteText: noteText,
      },
      {
        headers: new HttpHeaders({
          Authorization: `JWT ${this.token}`,
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  getAllNotesForVideo(videoId) {
    this.handleRequestSent();
    return this.http.get(`${environment.backendAPIBaseUrl}/notes/${videoId}`, {
      headers: new HttpHeaders({
        Authorization: `JWT ${this.token}`,
        'Content-Type': 'application/json',
      }),
    });
  }
  updateNote(noteId, updatedNote) {
    this.handleRequestSent();
    return this.http.put(`${environment.backendAPIBaseUrl}/notes/${noteId}`, updatedNote, {
      headers: new HttpHeaders({
        Authorization: `JWT ${this.token}`,
        'Content-Type': 'application/json',
      }),
    });
  }

  deleteNote(noteId) {
    this.handleRequestSent();
    return this.http.delete(`${environment.backendAPIBaseUrl}/notes/${noteId}`, {
      headers: new HttpHeaders({
        Authorization: `JWT ${this.token}`,
        'Content-Type': 'application/json',
      }),
    });
  }
}

