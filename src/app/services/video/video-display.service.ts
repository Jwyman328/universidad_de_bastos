import { Injectable, NgZone } from '@angular/core';
import { interval, BehaviorSubject } from 'rxjs';
import { VideoWatchedService } from '../http-requests/video-watched.service';

@Injectable({
  providedIn: 'root',
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
  public notes = [];
  public currentNote: string = '';
  public noteTitle: any;
  public isNoteCenterOpen: boolean = true;
  public videoTitle = new BehaviorSubject('');
  public videoHeight = 390;
  public videoWidth// = 640;
  public pixelPerSecond; //(this.videoWidth / 8) //105; 



  subscription: any = null;
  source: any = interval(1000);
  intervalId: any;
  public videoProg: any = new BehaviorSubject(0);

  //isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  constructor(private ngZone: NgZone,private videoWatchedService:VideoWatchedService) {}
  
  setVideoPlayerHeightWidth(height,width){
    this.videoHeight = height;
    this.videoWidth = width
  }

  setVideoPlayer(player) {
    this.player = player;
  }

  async startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      height: this.videoHeight,
      width: this.videoWidth,
      videoId: this.video.value,
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
          this.ngZone.run(() => this.onPlayerStateChange(event)),
        onError: (event) => this.ngZone.run(() => this.onPlayerError(event)),
        onReady: (event) =>
          this.ngZone.run(() => {
            this.onPlayerReady(event);
          }),
      },
    });
  }
  isReady = new BehaviorSubject(false);
  onPlayerReady(event) {
    this.myplayer = event.target;
    this.totalDuration = this.player.getDuration();
    this.calculatePixelPerSecond();
    // if (this.isRestricted) {
    //   event.target.mute();
    // } else {
    //   this.player.mute();
    // }
    this.isReady.next(true);
  }

  calculatePixelPerSecond() {
    const pixelPerSecond = this.videoWidth / this.totalDuration;
    this.pixelPerSecond = pixelPerSecond;
  }

  onPlayerStateChange(event) {
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
    
          this.videoWatchedService.addVideoWatched({videoUrl:this.video.value}).subscribe((res)=>{
            console.log('recorded')
          })
        
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
      this.videoProg.next(this.cleanTime());
    });
    //
  }

  setVideo(video: string) {
    this.video.next(video);
  }

  setVideoTitle(videoTitle) {
    this.videoTitle.next(videoTitle);
  }
}
