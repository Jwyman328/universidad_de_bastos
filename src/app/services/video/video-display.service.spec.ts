import { TestBed } from '@angular/core/testing';

import { VideoDisplayService } from './video-display.service';

describe('VideoDisplayService', () => {
  let service: VideoDisplayService;

  beforeEach(() => {
    let ngZone = jasmine.createSpyObj('NgZone', ['run'])
    let videoWatchedService = jasmine.createSpyObj('VideoWatchedService',['addVideoWatched'])
    service = new VideoDisplayService(ngZone, videoWatchedService)
  });

  it('calculatePixelPerSecond should calculate how much space a second takes up in pixels', () => {
    service.totalDuration = 120 //seconds
    service.calculatePixelPerSecond()
    expect(service.pixelPerSecond).toEqual(7)
  });
});
