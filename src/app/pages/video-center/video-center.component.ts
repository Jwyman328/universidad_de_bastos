import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.scss']
})
export class VideoCenterComponent implements OnInit {
  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;
  public totalDuration:number;
  public pixelPerSecond = 105;
  public notes = []
  
  constructor( public cdr: ChangeDetectorRef ) {}
  init() {
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  ngOnInit() {
    this.init();
    this.video = '1cH2cerUpMQ' //video id

    window['onYouTubeIframeAPIReady'] = (e) => {
      this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].Player('player', {
        height: '390',
        width: '840',
        videoId: this.video,
        playerVars: { 'autoplay': 0, 'controls': 0 },
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this),
          'onReady': (e) => {
            this.totalDuration = this.player.getDuration()
            //this.calculateSpot()
            if (!this.reframed) {
              this.reframed = true;
              //reframe(e.target.a);
            }
          }
        }
      });
      this.totalDuration = this.player.getDuration()
      console.log('tot', this.totalDuration)
    };
  }

  onPlayerStateChange(event) {
    console.log(event)
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    };
  };
  //utility
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
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
  changeVolume(){
    this.player.setVolume(100);
  }

  // calculateSpot(){
  //  const pixelPerSecond = 840 / this.totalDuration
  //  console.log(pixelPerSecond)
  //  this.pixelPerSecond = pixelPerSecond
  // }

  createNote(){
    // get the pixel placement of where the note is taken
    // then place a marker on this spot with ngstyle?
    const currentTimeOfNote = this.player.getCurrentTime()
    const timeSp = (currentTimeOfNote *  this.pixelPerSecond) + 'px'
    this.notes.push({timeSpot:timeSp})

  }

  // take the width of the screen divide it by the seconds in the video
  // divide the seconds by pixels to see how many pixels for each second 
  // then put the video at 
}