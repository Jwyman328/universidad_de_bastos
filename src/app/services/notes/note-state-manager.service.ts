import { Injectable } from '@angular/core';
import { NoteStateService } from './note-state.service';
import { NotesService } from '../http-requests/notes.service';
import { VideoDisplayService } from '../video/video-display.service';

@Injectable({
  providedIn: 'root'
})
export class NoteStateManagerService {

  constructor(private noteStateService:NoteStateService, private notesService:NotesService, private videoDisplayService:VideoDisplayService) { }

  createNote() {
    const currentTimeOfNote = this.videoDisplayService.player.getCurrentTime();
    const timeSp = currentTimeOfNote * this.videoDisplayService.pixelPerSecond + 'px';
    // this.notes.push({
    //   timeSpot: timeSp,
    //   timeOfNote: currentTimeOfNote,
    //   noteText: this.currentNote,
    //   noteTitle: this.noteTitle,
    //   timeNoteCreated: this.displayMinuteBasedTime(currentTimeOfNote),
    // });
    this.createNoteInBackend(
      currentTimeOfNote,
      this.noteStateService.noteTitle.value,
      this.noteStateService.currentNote.value
    );
  //  this.clearNotePad();
  //  this.orderNotesBasedOffOfTime();
  }

  createNoteInBackend(noteTimeSpotInSeconds, noteTitle:string, noteText:string) {
    //post {"videoTimeNoteTakenInSeconds":50.5460 , "videoId": "54qfdasfst"}
    // t0 http://localhost:5000/notes/
    this.notesService
      .createNote(
        this.videoDisplayService.video.value,
        noteTimeSpotInSeconds,
        noteTitle,
        noteText
      )
      .subscribe((res) => {
        console.log('res', res);
      });
    this.getAllNotes();
  }

  getAllNotes() {
    console.log('get all notes');
    this.notesService
      .getAllNotesForVideo(this.videoDisplayService.video.value)
      .subscribe((res: any) => {
        const allCurrentNotes = res;
        const newNotes = [];
        allCurrentNotes.map((note) => {
          const timeSp =
            (note.videoTimeNoteTakenInSeconds) * this.videoDisplayService.pixelPerSecond + 'px';
            console.log('the note in the note ', timeSp)

          newNotes.push({
            _id: note._id,
            timeSpot: timeSp,
            timeOfNote: note.videoTimeNoteTakenInSeconds,
            noteText: note.noteText,
            noteTitle: note.noteTitle,
            timeNoteCreated: this.displayMinuteBasedTime(
              note.videoTimeNoteTakenInSeconds
            ),
          });
        });
        this.noteStateService.currentVideoNotes = newNotes;
        this.noteStateService.orderNotesBasedOffOfTime();
      });
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
