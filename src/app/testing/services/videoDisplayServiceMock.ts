import { Injectable, NgZone } from '@angular/core';
import { interval, BehaviorSubject } from 'rxjs';
import { VideoWatchedService } from 'src/app/services/http-requests/video-watched.service';

@Injectable({
  providedIn: 'root',
})
export class VideoDisplayServiceMock {
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
  public noteTitle: any;
  public isNoteCenterOpen: boolean = true;
  public videoTitle = new BehaviorSubject('');

  subscription: any = null;
  source: any = interval(1000);
  intervalId: any;
  public videoProg: any = new BehaviorSubject(0);

  //isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  constructor(private ngZone: any,private videoWatchedService:any) {}

  setVideoPlayer(player) {
    this.player = player;
  }

  async startVideo() {
    
  }

  isReady = new BehaviorSubject(false);
  onPlayerReady(event) {
    
  }

  calculatePixelPerSecond() {
    const pixelPerSecond = 840 / this.totalDuration;
    this.pixelPerSecond = pixelPerSecond;
  }

  onPlayerStateChange(event) {
    
  }

  onPlayerPaused() {
   
  }

  onPause() {
  }
  onPlay() {
  
  }

  cleanTime(): number {
    return Math.round(this.myplayer.getCurrentTime());
  }

  onPlayerError(event) {
    
  }

  onPlayVideo() {
  
  }

  onMute() {
  }

  onUnmute() {
  }

  cleanupSubs() {
   
  }

  onCheckProgress() {
   
  }

  setVideo(video: string) {
  }

  setVideoTitle(videoTitle) {
  }
}
