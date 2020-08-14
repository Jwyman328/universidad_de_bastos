import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteStateService {
  noteTitle = new BehaviorSubject('');
  currentNote =  new BehaviorSubject('');
  currentVideoNotes:any[] = [];
  constructor() { }

  orderNotesBasedOffOfTime() {
    if (this.currentVideoNotes.length > 0){
      this.currentVideoNotes.sort((a, b) => a.timeOfNote - b.timeOfNote);
    }
  }

  clearNotePad() {
    this.currentNote.next('')
    this.noteTitle.next('')
  }


}
