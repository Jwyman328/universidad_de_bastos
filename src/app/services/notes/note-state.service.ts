import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { sanitizedNote } from 'src/app/models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteStateService {
  noteTitle = new BehaviorSubject('');
  currentNote =  new BehaviorSubject('');
  currentVideoNotes = new BehaviorSubject<sanitizedNote[]>([]);
  constructor() { 

  }

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
