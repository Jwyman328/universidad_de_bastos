import { Injectable } from '@angular/core';
import { NoteStateService } from './note-state.service';
import { NotesService } from '../http-requests/notes.service';
import { VideoDisplayService } from '../video/video-display.service';
import { note, sanitizedNote } from 'src/app/models/note';

@Injectable({
  providedIn: 'root',
})
export class NoteStateManagerService {
  constructor(
    private noteStateService: NoteStateService,
    private notesService: NotesService,
    private videoDisplayService: VideoDisplayService
  ) {}

  async createNote() {
    const currentTimeOfNote = this.videoDisplayService.player.getCurrentTime();

    const timeSp =
      currentTimeOfNote * this.videoDisplayService.pixelPerSecond + 'px';

    this.createNoteInBackend(
      currentTimeOfNote,
      this.noteStateService.noteTitle.value,
      this.noteStateService.currentNote.value
    );
    setTimeout(async () => {
      await this.getAllNotes();
    }, 2000);
  }

  createNoteInBackend(
    noteTimeSpotInSeconds,
    noteTitle: string,
    noteText: string
  ) {
    this.notesService
      .createNote(
        this.videoDisplayService.video.value,
        noteTimeSpotInSeconds,
        noteTitle,
        noteText
      )
      .subscribe((res) => {
        console.log('note created');
      });
  }

  getAllNotes() {
    this.notesService
      .getAllNotesForVideo(this.videoDisplayService.video.value)
      .subscribe((res: note[]) => {
        const sanitizedNotes = this.sanitizeBackendNotes(res);
        this.noteStateService.setCurrentVideoNotes(sanitizedNotes);
        this.noteStateService.orderNotesBasedOffOfTime();
      });
  }

  sanitizeBackendNotes(backendNotes): sanitizedNote[] {
    const allCurrentNotes = backendNotes;
    const sanitizedNotes = [];
    allCurrentNotes.map((note) => {
      const timeSp =
        note.videoTimeNoteTakenInSeconds *
          this.videoDisplayService.pixelPerSecond +
        'px';
      const noteId = note._id ? note._id : note.id;
      sanitizedNotes.push({
        _id: noteId,
        timeSpot: timeSp,
        timeOfNote: note.videoTimeNoteTakenInSeconds,
        noteText: note.noteText,
        noteTitle: note.noteTitle,
        timeNoteCreated: this.displayMinuteBasedTime(
          note.videoTimeNoteTakenInSeconds
        ),
      });
    });
    return sanitizedNotes;
  }

  displayMinuteBasedTime(seconds) {
    if (seconds < 60) {
      //do nothing
      return Math.floor(seconds);
    } else {
      const minutes = seconds / 60;
      const onlyMinutes = parseInt(String(minutes));
      let onlySeconds: any = seconds - onlyMinutes * 60;
      if (onlySeconds < 10) {
        onlySeconds = '0' + onlySeconds.toString();
      }
      const onlySecondsNoDecimal = String(onlySeconds).split('.');
      return `${onlyMinutes}:${onlySecondsNoDecimal[0]}`;
    }
  }
}
