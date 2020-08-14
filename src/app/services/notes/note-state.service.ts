import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteStateService {
  noteTitle = new BehaviorSubject('');
  currentNote =  new BehaviorSubject('');
  currentVideoNotes:any[];
  constructor() { }

  orderNotesBasedOffOfTime() {
    this.currentVideoNotes.sort((a, b) => a.timeOfNote - b.timeOfNote);
  }

}
