import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestSentStatus } from './RequestSentStatusHandler/RequestSentStatusHandler';
import { UserAuthDataService } from './userData/user-auth-data.service';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesMockService extends RequestSentStatus {

  createNote(videoId, videoTimeNoteTakenInSeconds, noteTitle, noteText) {
    return new BehaviorSubject('')

  }

  getAllNotesForVideo(videoId) {
    return new BehaviorSubject('')

  }

  updateNote(noteId, updatedNote) {
    return new BehaviorSubject('')

  }

  deleteNote(noteId) {
    return new BehaviorSubject('')
  }
}
