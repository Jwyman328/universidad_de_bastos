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
import { VideoDisplayService } from 'src/app/services/video-display.service';

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
  public myplayer: any;
  public notes = [];
  public currentNote: string = '';
  public noteTitle: string;
  public isNoteCenterOpen: boolean = true;
  public areNotesReadyToBeDisplayed : boolean = false

  constructor(
    private ngZone: NgZone,
    private activatedRouter: ActivatedRoute,
    private notesService: NotesService,
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
      this.startVideo();
      return;
    }

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    window['onYouTubeIframeAPIReady'] = () => {
      this.startVideo();
    };
  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.videoDisplayService.cleanupSubs();
  }

  startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      height: '390',
      width: '840',
      videoId: this.videoDisplayService.video.value,
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        controls: 1,
        disablekb: 0,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1,
      },
      events: {
        onStateChange: (event) =>
          this.ngZone.run(() =>
            this.videoDisplayService.onPlayerStateChange(event)
          ),
        onError: (event) =>
          this.ngZone.run(() => this.videoDisplayService.onPlayerError(event)),
        onReady: (event) =>
          this.ngZone.run(() => { this.videoDisplayService.setVideoPlayer(this.player);
            this.videoDisplayService.onPlayerReady(event); this.setNotesReadyToBeDisplayed()}),//this.videoDisplayService.player = this.player;  this.videoDisplayService.totalDuration = this.player.getDuration()
      },
    });
  }

  setNotesReadyToBeDisplayed(){
    this.areNotesReadyToBeDisplayed = true
    this.getAllNotes()
  }

  createNote() {
    // get the pixel placement of where the note is taken
    // then place a marker on this spot with ngstyle?
    const currentTimeOfNote = this.videoDisplayService.player.getCurrentTime();
    const timeSp = currentTimeOfNote * this.videoDisplayService.pixelPerSecond + 'px';
    console.log('on create the note what we got?', timeSp, currentTimeOfNote)
    this.notes.push({
      timeSpot: timeSp,
      timeOfNote: currentTimeOfNote,
      noteText: this.currentNote,
      noteTitle: this.noteTitle,
      timeNoteCreated: this.displayMinuteBasedTime(currentTimeOfNote),
    });
    this.createNoteInBackend(
      currentTimeOfNote,
      this.noteTitle,
      this.currentNote
    );
    this.clearNotePad();
    this.orderNotesBasedOffOfTime();
  }

  createNoteInBackend(noteTimeSpotInSeconds, noteTitle, noteText) {
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
        this.notes = newNotes;
        this.orderNotesBasedOffOfTime();
      });
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

  orderNotesBasedOffOfTime() {
    this.notes.sort((a, b) => a.timeOfNote - b.timeOfNote);
  }

  @ViewChildren('allNotes') components: any;

  travelToNote(indexOfelement: number) {
    const arr = this.components._results;
    const thisEle = arr[indexOfelement];
    thisEle.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
