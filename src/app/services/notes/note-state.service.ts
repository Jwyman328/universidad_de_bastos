import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteStateService {
  noteTitle = new BehaviorSubject('');
  currentNote =  new BehaviorSubject('');
  currentVideoNotes = new BehaviorSubject<any[]>([]);
  constructor() { }

  orderNotesBasedOffOfTime() {
    if (this.currentVideoNotes.value.length > 0){
      this.currentVideoNotes.value.sort((a, b) => a.timeOfNote - b.timeOfNote);
    }
  }

  clearNotePad() {
    this.currentNote.next('')
    this.noteTitle.next('')
  }

  setCurrentVideoNotes(newNotes){
    this.currentVideoNotes.next(newNotes)
  }


}
