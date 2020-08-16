import {
  Component,
  OnInit,
  ChangeDetectorRef,
  NgZone,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/services/http-requests/notes.service';
import { VideoDisplayService } from 'src/app/services/video/video-display.service';
import { DisplayNoteComponent } from '../../components/display-note/display-note.component';
import { NoteStateManagerService } from '../../services/notes/note-state-manager.service';
import { NoteStateService } from 'src/app/services/notes/note-state.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.scss'],
})
export class VideoCenterComponent implements OnInit {
  //second try

  /* 1. Some required variables which will be used by YT API*/
  public YT: any;
  public player: any;
  public reframed: Boolean = false;
  public notes = [];
  public currentNote: string = '';
  public noteTitle: string = '';
  public isNoteCenterOpen: boolean = true;
  public areNotesReadyToBeDisplayed: boolean = false;

  constructor(
    private ngZone: NgZone,
    private activatedRouter: ActivatedRoute,
    private notesService: NotesService,
    private noteStateManagerService: NoteStateManagerService,
    private noteStateService: NoteStateService,
    public videoDisplayService: VideoDisplayService
  ) {
    this.videoDisplayService.setVideo(
      this.activatedRouter.snapshot.paramMap.get('videoUrl')
    );
    this.videoDisplayService.setVideoTitle(
      this.activatedRouter.snapshot.paramMap.get('videoTitle')
    );
  }

  /* 2. Initialize method for YT IFrame API */
  init() {
    this.getAllNotes();
    // Return if Player is already created
    if (window['YT']) {
      this.videoDisplayService.startVideo();

      return;
    }

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    window['onYouTubeIframeAPIReady'] = () => {
      this.videoDisplayService.startVideo();
    };
  }

  ngOnInit() {
    this.init();
    this.setNotesReadyToBeDisplayed();

    this.videoDisplayService.isReady.subscribe((isReady: boolean) => {
      if (isReady) {
        this.setNotesReadyToBeDisplayed();
      }
    });

    this.noteStateService.currentNote.subscribe((newCurrentNote) => {
      this.currentNote = newCurrentNote;
    });

    this.noteStateService.noteTitle.subscribe((newNoteTitle) => {
      this.noteTitle = newNoteTitle;
    });

    this.noteStateService.currentVideoNotes.subscribe((newNotes) => {
      this.notes = newNotes;
    });
  }

  ngOnDestroy() {
    this.videoDisplayService.cleanupSubs();
  }

  setNotesReadyToBeDisplayed() {
    this.areNotesReadyToBeDisplayed = true;

    return this.getAllNotes();
  }

  setNoteTitle(event) {
    this.noteStateService.noteTitle.next(event.target.value);
  }

  setCurrentNote(event) {
    this.noteStateService.currentNote.next(event.target.value);
  }

  createNote() {
    this.noteStateManagerService.createNote();
    this.clearNotePad();
  }

  getAllNotes() {
    this.noteStateManagerService.getAllNotes();
  }

  discardNote() {
    this.isNoteCenterOpen = false;
    this.clearNotePad();
  }

  clearNotePad() {
    this.currentNote = '';
    this.noteTitle = '';
  }

  toggleNoteCenter() {
    this.isNoteCenterOpen = !this.isNoteCenterOpen;
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

  gotoNoteTimeSpot(event, note) {
    event.stopPropagation();
    this.videoDisplayService.player.seekTo(note.timeOfNote);
  }

  @ViewChildren('allNotes') components: any;

  travelToNote(indexOfelement: number) {
    const arr = this.components._results;
    const thisEle: any = arr[indexOfelement];
    thisEle.nativeElement.previousElementSibling.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
