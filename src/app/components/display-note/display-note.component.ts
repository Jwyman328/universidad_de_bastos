import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NotesService } from 'src/app/services/http-requests/notes.service';
import { note } from '../../models/note';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss'],
})
export class DisplayNoteComponent implements OnInit {
  isNoteDeleted = false;
  isInEditMode = false;
  showDeleteNoteModal = false;
  @Input('note') note: note;
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

  deleteNote() {
    const noteId = this.note._id ? this.note._id : this.note.id;

    this.notesService.deleteNote(noteId).subscribe((res) => {
      this.isNoteDeleted = true;
    });
    this.showDeleteNoteModal = false;
  }
  cancelDeleteNote() {
    this.showDeleteNoteModal = false;
  }

  openDeleteNote() {
    this.showDeleteNoteModal = true;
  }

  leaveEditMode() {
    this.isInEditMode = false;
  }

  saveNote() {
    const updateNoted = {
      noteText: this.currentNote,
      noteTitle: this.noteTitle,
    };
    //set local state
    this.note.noteText = this.currentNote;
    this.note.noteTitle = this.noteTitle;
    const noteId = this.note._id ? this.note._id : this.note.id;
    this.notesService.updateNote(noteId, updateNoted).subscribe((res) => {
      this.leaveEditMode();
    });
  }

  cancelNote() {
    this.noteTitle = this.note.noteTitle;
    this.currentNote = this.note.noteText;
    this.videoTime = this.note.timeNoteCreated;
    this.leaveEditMode();
  }
}
