import { Injectable, NgZone } from '@angular/core';
import { interval, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoDisplayService {

  public YT: any;
  public video = new BehaviorSubject('');
  public player: any;
  public reframed: Boolean = false;
  public myplayer: any;
  public pausedAt: number = 0;
  public isPaused: boolean = false;
  public totalDuration: number;
  public pixelPerSecond = 105;
  public notes = [];
  public currentNote: string = '';
  public noteTitle :any;
  public isNoteCenterOpen: boolean = true;
  public videoTitle = new BehaviorSubject('');;

  subscription: any = null;
  source: any = interval(1000);
  intervalId: any;
  public videoProg: any = new BehaviorSubject(0);

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  constructor(    private ngZone: NgZone
    ) { }

    setVideoPlayer(player){
      this.player = player
    }

  onPlayerReady(event) {
    this.myplayer = event.target;
    this.totalDuration = this.player.getDuration();
    this.calculatePixelPerSecond();
    if (this.isRestricted) {
      event.target.mute();
      //do not want to play automatically
      //this.onPlayVideo()
    } else {
      this.player.mute();
      //do not want to play automatically
      //this.onPlayVideo()
    }
  }

  calculatePixelPerSecond() {
    const pixelPerSecond = 840 / this.totalDuration;
    this.pixelPerSecond = pixelPerSecond;
  }

  onPlayerStateChange(event) {
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() == 0) {
        } else {
        }
        this.onCheckProgress();
        break;
      case window['YT'].PlayerState.PAUSED:
        this.onPlayerPaused();
        break;
      case window['YT'].PlayerState.ENDED:
        break;
    }
  }

  onPlayerPaused() {
    if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
      this.pausedAt = this.player.getCurrentTime();
      this.cleanupSubs();
    }
  }

  onPause() {
    this.player.pauseVideo();
  }
  onPlay() {
    this.player.seekTo(this.pausedAt, true);
    this.onPlayVideo();
  }

  cleanTime(): number {
    return Math.round(this.myplayer.getCurrentTime());
  }

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }

  onPlayVideo() {
    this.player.playVideo();
    this.pausedAt = 0;
  }

  onMute() {
    this.player.mute();
  }

  onUnmute() {
    this.player.unMute();
  }

  cleanupSubs() {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    } else {
    }
  }

  onCheckProgress() {
    if (this.subscription != null) {
      this.cleanupSubs();
    }
    this.subscription = this.source.subscribe((val) => {
      this.videoProg.next(this.cleanTime() );
    });
    //
  }

  setVideo(video:string){
    this.video.next(video)
  }

  setVideoTitle(videoTitle){
    this.videoTitle.next(videoTitle)
  }
}
