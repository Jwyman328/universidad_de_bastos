import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoCardComponent } from './video-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { videoDataMock } from 'src/app/testing/mockData/videoDataMock';
import { NotesService } from 'src/app/services/http-requests/notes.service';
import { of } from 'rxjs';
import { noteMock } from 'src/app/testing/mockData/noteMock';

describe('VideoCardComponent', () => {
  let component: VideoCardComponent;
  let fixture: ComponentFixture<VideoCardComponent>;
  let notesService:NotesService;
  beforeEach(async(() => {
    notesService = jasmine.createSpyObj('NotesService',['getAllNotesForVideo']);
    notesService.getAllNotesForVideo = jasmine.createSpy('getAllNotesForVideo').and.returnValue(of([noteMock]))
    TestBed.configureTestingModule({
    imports:[RouterTestingModule],
      declarations: [ VideoCardComponent ],
      providers: [{provide:NotesService, useValue:notesService}]
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

  it('on ngOnInit should call getAllNotesForVideo with videoUrl', () => {
    component.videoData = videoDataMock
    component.ngOnInit()
    expect(notesService.getAllNotesForVideo).toHaveBeenCalledWith(videoDataMock.videoUrl)
  });



});
