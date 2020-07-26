import { Component, OnInit, ChangeDetectorRef, NgZone, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.scss'],

})
export class VideoCenterComponent implements OnInit {
  
  // public YT: any;
  // public video: any;
  // public player: any;
  // public reframed: Boolean = false;

  
  // constructor( public cdr: ChangeDetectorRef,private ngZone: NgZone ) {}
  // init() {
  //   var tag = document.createElement('script');
  //   tag.src = 'https://www.youtube.com/iframe_api';
  //   var firstScriptTag = document.getElementsByTagName('script')[0];
  //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  // }

  // ngOnInit() {
  //   this.init();
  //   this.video = '1cH2cerUpMQ' //video id

  //   window['onYouTubeIframeAPIReady'] = (e) => {
  //     this.YT = window['YT'];
  //     this.reframed = false;
  //     this.player = new window['YT'].Player('player', {
  //       height: '390',
  //       width: '840',
  //       videoId: this.video,
  //       playerVars: { 'autoplay': 0, 'controls': 0 },
  //       events: {
  //         'onStateChange': (event) => {this.ngZone.run(() => {this.onPlayerStateChange(event); this.onPlayerStateChange.bind(this)}); }  ,//this.onPlayerStateChange.bind(this),
  //         'onError': this.onPlayerError.bind(this),
  //         'onReady': (e) => {
  //           this.totalDuration = this.player.getDuration()
  //           //this.calculateSpot()
  //           if (!this.reframed) {
  //             this.reframed = true;
  //             //reframe(e.target.a);
  //           }
  //         }
  //       }
  //     });
  //     this.totalDuration = this.player.getDuration()
  //     console.log('tot', this.totalDuration)
  //   };
  // }

  // onPlayerStateChange(event) {
  //   console.log(event)
  //   switch (event.data) {
  //     case window['YT'].PlayerState.PLAYING:
  //       if (this.cleanTime() == 0) {
  //         console.log('started ' + this.cleanTime());
  //       } else {
  //         console.log('playing ' + this.cleanTime())
  //       };
  //       break;
  //     case window['YT'].PlayerState.PAUSED:
  //       if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
  //         console.log('paused' + ' @ ' + this.cleanTime());
  //       };
  //       break;
  //     case window['YT'].PlayerState.ENDED:
  //       console.log('ended ');
  //       break;
  //   };
  // };
  // //utility
  // cleanTime() {
  //   return Math.round(this.player.getCurrentTime())
  // };
  // onPlayerError(event) {
  //   switch (event.data) {
  //     case 2:
  //       console.log('' + this.video)
  //       break;
  //     case 100:
  //       break;
  //     case 101 || 150:
  //       break;
  //   };
  // };
  // changeVolume(){
  //   this.player.setVolume(100);
  // }



  // // take the width of the screen divide it by the seconds in the video
  // // divide the seconds by pixels to see how many pixels for each second 
  // // then put the video at 


  //second try
  title = 'dummyApp-YTIFrameAPI';

  /* 1. Some required variables which will be used by YT API*/
  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;
  public myplayer: any;
  public pausedAt: number = 0;
  public isPaused: boolean = false;
  public totalDuration:number;
  public pixelPerSecond = 105;
  public notes = []
  public currentNote:string = '';
  public noteTitle:string;
  public isNoteCenterOpen:boolean = false;


  subscription: any = null;
  source: any = interval(1000);
  intervalId: any;
  public videoProg: any = 0;

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  constructor(private ngZone: NgZone) {}

  /* 2. Initialize method for YT IFrame API */
  init() {
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
    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  ngOnInit() {
    this.video = 'BsL7pjxko7Q'; //'nRiOw3qGYq4';
    this.init();
  }

  

  ngOnDestroy() {
   this.cleanupSubs();
  }

  startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      height: '390',
      width: '840',
      videoId: this.video,
      playerVars: {
        autoplay: 0,
        modestbranding: 1,
        controls: 1,
        disablekb: 0,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1

      },
      events: {
        'onStateChange': (event) => this.ngZone.run(() => this.onPlayerStateChange(event)),
        'onError': (event) => this.ngZone.run(() => this.onPlayerError(event)),
        'onReady': (event) => this.ngZone.run(() => this.onPlayerReady(event)),
      }
    });
  }

  /* 4. It will be called when the Video Player is ready */
  onPlayerReady(event) {
    this.myplayer = event.target;
    this.totalDuration = this.player.getDuration()
    this.calculateSpot()
    if (this.isRestricted) {
      event.target.mute();
      //do not want to play automatically
     // this.onPlayVideo()
    } else {
      this.player.mute()
      //do not want to play automatically
      //this.onPlayVideo()
    }
  }

  /* 5. API will call this function when Player State changes like PLAYING, PAUSED, ENDED */
  onPlayerStateChange(event) {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        this.onCheckProgress()
        break;
      case window['YT'].PlayerState.PAUSED:
           this.onPlayerPaused()
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    };
  };

  onPlayerPaused() {
    if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
      console.log('paused' + ' @ ' + this.cleanTime());
      this.pausedAt = this.player.getCurrentTime();
      this.cleanupSubs();
    };
  }
  onPause() {
    console.log("here in pause", this.videoProg);
    this.player.pauseVideo();
   
  }
  onPlay() {
    this.player.seekTo(this.pausedAt, true);
    this.onPlayVideo()
  }


  cleanTime(): number {
    return Math.round(this.myplayer.getCurrentTime())
  };

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };

  onPlayVideo() {
    this.player.playVideo();
    this.pausedAt = 0;
  }

  onMute() {
    this.player.mute();
  }

  onUnmute() {
    this.player.unMute()
  }

  cleanupSubs() {
    if (this.subscription != null ) {
       this.subscription.unsubscribe();
       console.log("Cleaned up sub");
       this.subscription = null;
       

    } else {
      console.log("No subs to unsub");
    }
  }

  onCheckProgress() {
    
    console.log("check progress set")
    if (this.subscription != null) {
      this.cleanupSubs();
    }
    this.subscription = this.source.subscribe(val => {
      this.videoProg = this.cleanTime()
      console.log("check progress fired. ", this.videoProg);
    });
//

  }
  //custom functions 

  calculateSpot(){
    const pixelPerSecond = 840 / this.totalDuration
    this.pixelPerSecond = pixelPerSecond
   }
 
   createNote(){
     // get the pixel placement of where the note is taken
     // then place a marker on this spot with ngstyle?
     const currentTimeOfNote = this.player.getCurrentTime()
     const timeSp = (currentTimeOfNote *  this.pixelPerSecond) + 'px'
     console.log('what is this should display nice', this.displayMinuteBasedTime(currentTimeOfNote))
     this.notes.push({timeSpot:timeSp, timeOfNote:currentTimeOfNote, noteText:this.currentNote, noteTitle:this.noteTitle, timeNoteCreated:this.displayMinuteBasedTime(currentTimeOfNote)})
     this.clearNotePad()
     this.orderNotesBasedOffOfTime()
   }
   discardNote(){
    this.isNoteCenterOpen = false;
    this.clearNotePad()
   }

   clearNotePad(){
     this.currentNote = '';
     this.noteTitle = ''
   }

   toggleNoteCenter(){
    this.isNoteCenterOpen = !this.isNoteCenterOpen;
   }

   displayMinuteBasedTime(seconds){
     console.log(seconds, 'here da secs')
    if (seconds < 60){
      //do nothing
      return seconds
    }else{
      const minutes = seconds / 60
      const onlyMinutes = parseInt(String(minutes))
      let onlySeconds: any = seconds - (onlyMinutes * 60)
      if(onlySeconds < 10){
        onlySeconds = '0' + onlySeconds.toString()
      }
      const onlySecondsNoDecimal = String(onlySeconds).split('.')
      return `${onlyMinutes}:${onlySecondsNoDecimal[0]}`
    }
   }

   gotoNoteTimeSpot(event, note){
    event.stopPropagation()
    this.player.seekTo(note.timeOfNote)
    console.log(this.components)
   }

   orderNotesBasedOffOfTime(){
   this.notes.sort((a,b) => a.timeOfNote-b.timeOfNote)
   }

   @ViewChildren('allNotes') components:any;

   travelToNote(indexOfelement:number){
    const arr = this.components._results
  const thisEle =  arr[indexOfelement]
  thisEle.nativeElement.scrollIntoView({ behavior: 'smooth' })
    console.log('clicked cl',thisEle.nativeElement) //
   }


}