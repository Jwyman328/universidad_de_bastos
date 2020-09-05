import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoCardComponent } from './video-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { videoDataMock } from 'src/app/testing/mockData/videoDataMock';

describe('VideoCardComponent', () => {
  let component: VideoCardComponent;
  let fixture: ComponentFixture<VideoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports:[RouterTestingModule],
      declarations: [ VideoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCardComponent);
    component = fixture.componentInstance;
    component.videoData = videoDataMock
    fixture.detectChanges();
  });

  it('should on goToNoteCenter, navigate to the specific video', () => {
    spyOn(component.route,'navigate')
    component.goToNoteCenter()
    expect(component.route.navigate).toHaveBeenCalledWith(['video-center', videoDataMock.videoUrl,videoDataMock.title])
  });
});
