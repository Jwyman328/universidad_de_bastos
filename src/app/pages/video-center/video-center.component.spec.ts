import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCenterComponent } from './video-center.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { NoteStateManagerService } from 'src/app/services/notes/note-state-manager.service';
import { NoteStateService } from 'src/app/services/notes/note-state.service';
import { of } from 'rxjs';
import { VideoDisplayService } from 'src/app/services/video/video-display.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
let noteStateManagerService: NoteStateManagerService;
let noteStateService: NoteStateService;
let videoDisplayService: VideoDisplayService;

describe('VideoCenterComponent', () => {
  let component: VideoCenterComponent;
  let fixture: ComponentFixture<VideoCenterComponent>;

  noteStateManagerService = jasmine.createSpyObj('NoteStateManagerService', [
    'createNote',
    'getAllNotes',
  ]);

  noteStateService = jasmine.createSpyObj('NoteStateService', [
    'currentNote',
    'noteTitle',
    'currentVideoNotes',
  ]);
  noteStateService.currentNote.subscribe = jasmine
    .createSpy('subscribe')
    .and.returnValue(of('mockCurrentNote'));
  noteStateService.noteTitle.subscribe = jasmine
    .createSpy('subscribe')
    .and.returnValue(of('mocknoteTitle'));

  noteStateService.currentVideoNotes.subscribe = jasmine
    .createSpy('subscribe')
    .and.returnValue(of('mocknoteTitle'));

  videoDisplayService = jasmine.createSpyObj('VideoDisplayService', [
    'setVideo',
    'setVideoTitle',
    'startVideo',
    'isReady',
    'cleanupSubs',
    'player',
  ]);
  videoDisplayService.isReady = jasmine.createSpyObj('isReady', ['subscribe']);
  videoDisplayService.isReady.subscribe = jasmine
    .createSpy('subscribe')
    .and.returnValue(of(true));

  videoDisplayService.player = jasmine.createSpyObj('isReady', ['seekTo']);
  videoDisplayService.player.seekTo = jasmine.createSpy('subscribe');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoCenterComponent],
      schemas: [NO_ERRORS_SCHEMA],

      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                videoUrl: '1',
                videoTitle: '2',
              }),
            },
          },
        },
        { provide: NoteStateManagerService, useValue: noteStateManagerService },
        { provide: NoteStateService, useValue: noteStateService },
        { provide: VideoDisplayService, useValue: videoDisplayService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCenterComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('on constructor call setVideo', () => {
    expect(videoDisplayService.setVideo).toHaveBeenCalled();
  });

  it('on constructor call setVideoTitle', () => {
    expect(videoDisplayService.setVideoTitle).toHaveBeenCalled();
  });

  it('ngOninit should call init()', () => {
    spyOn(component, 'init');
    component.ngOnInit();
    expect(component.init).toHaveBeenCalled();
  });

  it('ngOninit should call setNotesReadyToBeDisplayed()', () => {
    spyOn(component, 'setNotesReadyToBeDisplayed');
    component.ngOnInit();
    expect(component.setNotesReadyToBeDisplayed).toHaveBeenCalled();
  });

  it('ngOninit should calll noteStateService.currentNote.subscribe', () => {
    component.ngOnInit();
    expect(noteStateService.currentNote.subscribe).toHaveBeenCalled();
  });

  it('ngOninit should calll noteStateService.noteTitle.subscribe', () => {
    component.ngOnInit();
    expect(noteStateService.noteTitle.subscribe).toHaveBeenCalled();
  });

  it('ngOninit should calll noteStateService.currentVideoNotes.subscribe', () => {
    component.ngOnInit();
    expect(noteStateService.currentVideoNotes.subscribe).toHaveBeenCalled();
  });

  it('init should call getAllNotes', () => {
    spyOn(component, 'getAllNotes');
    component.init();
    expect(component.getAllNotes).toHaveBeenCalled();
  });

  //   it('init should call videoDisplayService startVideo', (done) => {
  //     setTimeout(() => {
  //       spyOn(component, 'getAllNotes');
  //       component.init();
  //       expect(component.videoDisplayService.startVideo).toHaveBeenCalled();
  //       done();
  //     }, 1000);
  //   });

  it('setNotesReadyToBeDisplayed should set areNotesReadyToBeDisplayed to true ', () => {
    component.areNotesReadyToBeDisplayed = false;
    component.setNotesReadyToBeDisplayed();
    expect(component.areNotesReadyToBeDisplayed).toEqual(true);
  });

  it('setNotesReadyToBeDisplayed should call getAllNotes ', () => {
    spyOn(component, 'getAllNotes');
    component.setNotesReadyToBeDisplayed();
    expect(component.getAllNotes).toHaveBeenCalled();
  });

  it('createNote should call noteStateManagerService.createNote', () => {
    component.createNote();
    expect(noteStateManagerService.createNote).toHaveBeenCalled();
  });

  it('createNote should call clearNotePad', () => {
    spyOn(component, 'clearNotePad');
    component.createNote();
    expect(component.clearNotePad).toHaveBeenCalled();
  });

  it('getAllNotes should call stateManager.getAllNotes', () => {
    component.getAllNotes();
    expect(noteStateManagerService.getAllNotes).toHaveBeenCalled();
  });

  it('discardNote should set isNoteCenterOpen to false', () => {
    component.isNoteCenterOpen = true;
    component.discardNote();
    expect(component.isNoteCenterOpen).toEqual(false);
  });

  it('discardNote should call clear notepad', () => {
    spyOn(component, 'clearNotePad');
    component.discardNote();
    expect(component.clearNotePad).toHaveBeenCalled();
  });

  it('clearNotePad should set currentNote and noteTitle to empty string', () => {
    component.currentNote = 'not empty';
    component.noteTitle = 'not empty';
    component.clearNotePad();
    expect(component.currentNote).toEqual('');
    expect(component.noteTitle).toEqual('');
  });

  it('toggleNoteCenter should reverse isNoteCenterOpen boolean', () => {
    component.isNoteCenterOpen = false
    component.toggleNoteCenter();
    expect(component.isNoteCenterOpen ).toEqual(true)
  });

  it('displayMinuteBasedTime should turn a over 60 seconds into a text based time', ()=>{
    const minuteBasedTime = component.displayMinuteBasedTime(66)
    expect(minuteBasedTime).toEqual('1:06')
 })

 it('displayMinuteBasedTime shouldkeep time under 60 seconds in its original form', ()=>{
    const minuteBasedTime = component.displayMinuteBasedTime(59)
    expect(minuteBasedTime).toEqual(59)
 })
  
});
