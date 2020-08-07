import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NotesService } from 'src/app/services/http-requests/notes.service';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss'],
})
export class DisplayNoteComponent implements OnInit {
  isInEditMode = false;
  @Input('note') note;
  noteTitle = '';
  currentNote = '';
  videoTime = 0;
  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.noteTitle = this.note.noteTitle;
    this.currentNote = this.note.noteText;
    this.videoTime = this.note.timeNoteCreated;
  }

  switchToEditMode() {
    this.isInEditMode = true;
  }

  editNote() {
    this.isInEditMode = true;
  }

  leaveEditMode() {
    this.isInEditMode = false;
  }

  saveNote() {
    const updateNoted = {
      "noteText": this.currentNote,
      "noteTitle": this.noteTitle,
    };
    this.notesService.updateNote(this.note._id,updateNoted).subscribe(res => {
      this.leaveEditMode()
    });
  }

  cancelNote() {
    this.noteTitle = this.note.noteTitle;
    this.currentNote = this.note.noteText;
    this.videoTime = this.note.timeNoteCreated;
    this.leaveEditMode()

  }
}
